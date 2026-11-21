import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GREETING } from "../_chat/prompt.js";
import { conversationExists, createConversation, loadMessages } from "../_chat/store.js";

// POST /api/chat/session            start a chat with Qami -> { conversationId, greeting }
// GET  /api/chat/session?id=<uuid>  the chat so far, so a reload or a new page keeps it

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.DATABASE_URL || !process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: "Qami isn't available right now.", unavailable: true });
    return;
  }

  try {
    if (req.method === "POST") {
      const page = typeof req.body?.page === "string" ? req.body.page : "/";
      const conversationId = await createConversation(page, GREETING);
      res.status(200).json({ conversationId, greeting: GREETING });
      return;
    }

    if (req.method === "GET") {
      const id = typeof req.query.id === "string" ? req.query.id : "";
      if (!UUID.test(id) || !(await conversationExists(id))) {
        res.status(404).json({ error: "This chat has expired." });
        return;
      }
      const messages = await loadMessages(id, 200);
      res.status(200).json({ conversationId: id, messages });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("chat session failed:", err instanceof Error ? err.message : "unknown error");
    res.status(502).json({ error: "Qami couldn't start just now. Please try again." });
  }
}
