use std::{error, string, sync::Mutex};

mod schema;
mod db;

struct AppState {
  count: Mutex<i64>,
  conn: Mutex<SqliteConnection>,
}

pub fn run() -> AppState {
  let conn = db::establish_connection();
  // embedded_migrations::run(&conn);
  diesel_migrations::run_pending_migrations(&conn).expect("Error migrating");

  let state = AppState {
    count: Default::default(),
    conn: Mutex::new(db::establish_connection()),
  };
  
  return state;
}