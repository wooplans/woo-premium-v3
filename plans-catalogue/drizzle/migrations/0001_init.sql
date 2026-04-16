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
