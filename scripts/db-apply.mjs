// Creates the job-application tables in Neon from db/applicants.sql.
//
//   DATABASE_URL="postgresql://..." node scripts/db-apply.mjs
//
// Every statement is CREATE ... IF NOT EXISTS, so re-running is harmless.
// Neon's HTTP driver takes one statement per query, hence the split.

import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL to the Neon connection string first.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const file = await readFile(new URL("../db/applicants.sql", import.meta.url), "utf8");
const statements = file
  .replace(/--.*$/gm, "")
  .split(/;\s*(?:\n|$)/)
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log(`ok: ${statement.split("\n")[0]}`);
}

const [{ count }] = await sql.query("SELECT count(*)::int AS count FROM applicants");
console.log(`applicants table ready (${count} rows).`);
