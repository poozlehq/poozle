-- Your SQL goes here
CREATE TABLE commands (
  id INTEGER NOT NULL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  data TEXT NOT NULL,
  extension_id TEXT NOT NULL,
  extension_path TEXT NOT NULL
)