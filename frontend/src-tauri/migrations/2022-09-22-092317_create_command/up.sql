-- Your SQL goes here
CREATE TABLE commands (
  id INTEGER NOT NULL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  data TEXT NOT NULL,
  extension_id TEXT NOT NULL,
  command_type TEXT NOT NULL,
  has_quick_action BOOLEAN NOT NULL DEFAULT 0,
  CONSTRAINT unique_constraint UNIQUE (key, extension_id)
)