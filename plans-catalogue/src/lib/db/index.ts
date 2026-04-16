import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { createClient } from "@libsql/client";
import path from "path";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const dbPath = path.join(process.cwd(), "plans.db");
    const client = createClient({
      url: `file:${dbPath}`,
    });

    client.execute(`
      CREATE TABLE IF NOT EXISTS plans (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('duplex', 'villa')),
        description TEXT NOT NULL DEFAULT '',
        surface INTEGER,
        bedrooms INTEGER,
        bathrooms INTEGER,
        floors INTEGER,
        price REAL,
        features TEXT DEFAULT '[]',
        thumbnail TEXT DEFAULT '',
        images TEXT DEFAULT '[]',
        is_published INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    _db = drizzle(client, { schema });
  }
  return _db;
}

export { schema };
