import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

// Qami's conversations, in the same Neon database the careers form uses
// (DATABASE_URL). Three small tables, created on first use so there is no
// migration step to forget:
//   chat_conversations  one row per chat
//   chat_messages       the transcript, plus tool activity and token usage
//   chat_leads          details a visitor chose to leave

export type Role = "user" | "assistant";

export type StoredMessage = { role: Role; content: string };

let sqlClient: ReturnType<typeof neon> | null = null;
function sql() {
  sqlClient ??= neon(process.env.DATABASE_URL as string);
  return sqlClient;
}

let ready: Promise<void> | null = null;
function ensureTables(): Promise<void> {
  ready ??= (async () => {
    const db = sql();
    await db`CREATE TABLE IF NOT EXISTS chat_conversations (
      id uuid PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      last_activity_at timestamptz NOT NULL DEFAULT now(),
      start_page text,
      lead_saved boolean NOT NULL DEFAULT false
    )`;
    await db`CREATE TABLE IF NOT EXISTS chat_messages (
      id bigserial PRIMARY KEY,
      conversation_id uuid NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
      role text NOT NULL,
      content text NOT NULL,
      tool_calls jsonb,
      usage jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
    await db`CREATE INDEX IF NOT EXISTS chat_messages_conversation_idx ON chat_messages (conversation_id, id)`;
    await db`CREATE TABLE IF NOT EXISTS chat_leads (
      id bigserial PRIMARY KEY,
      conversation_id uuid NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      company text,
      country text,
      summary text NOT NULL,
      services jsonb,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
  })().catch((err) => {
    ready = null; // try again on the next request
    throw err;
  });
  return ready;
}

export async function createConversation(startPage: string, greeting: string): Promise<string> {
  await ensureTables();
  const id = randomUUID();
  const db = sql();
  await db`INSERT INTO chat_conversations (id, start_page) VALUES (${id}, ${startPage.slice(0, 300)})`;
  await db`INSERT INTO chat_messages (conversation_id, role, content) VALUES (${id}, 'assistant', ${greeting})`;
  return id;
}

export async function conversationExists(id: string): Promise<boolean> {
  await ensureTables();
  const rows = (await sql()`SELECT 1 FROM chat_conversations WHERE id = ${id}`) as unknown[];
  return rows.length > 0;
}

export async function loadMessages(id: string, limit: number): Promise<StoredMessage[]> {
  await ensureTables();
  const rows = (await sql()`
    SELECT role, content FROM (
      SELECT id, role, content FROM chat_messages WHERE conversation_id = ${id} ORDER BY id DESC LIMIT ${limit}
    ) recent ORDER BY id ASC`) as StoredMessage[];
  return rows;
}

export async function countVisitorMessages(id: string): Promise<number> {
  const rows = (await sql()`SELECT count(*)::int AS n FROM chat_messages WHERE conversation_id = ${id} AND role = 'user'`) as {
    n: number;
  }[];
  return rows[0]?.n ?? 0;
}

export async function addMessage(
  id: string,
  role: Role,
  content: string,
  extra: { toolCalls?: unknown; usage?: unknown } = {},
): Promise<void> {
  const db = sql();
  await db`INSERT INTO chat_messages (conversation_id, role, content, tool_calls, usage)
    VALUES (${id}, ${role}, ${content}, ${extra.toolCalls ? JSON.stringify(extra.toolCalls) : null}, ${
      extra.usage ? JSON.stringify(extra.usage) : null
    })`;
  await db`UPDATE chat_conversations SET last_activity_at = now() WHERE id = ${id}`;
}

export type LeadInput = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  summary: string;
  services: string[];
};

export async function saveLead(id: string, lead: LeadInput): Promise<void> {
  const db = sql();
  await db`INSERT INTO chat_leads (conversation_id, name, email, phone, company, country, summary, services)
    VALUES (${id}, ${lead.name}, ${lead.email}, ${lead.phone}, ${lead.company}, ${lead.country}, ${lead.summary}, ${JSON.stringify(
      lead.services,
    )})`;
  await db`UPDATE chat_conversations SET lead_saved = true WHERE id = ${id}`;
}
