pub mod models;
pub mod query;
use diesel::prelude::*;

pub fn establish_connection() -> SqliteConnection {
    let data_dir = tauri::api::path::data_dir()
        .unwrap()
        .into_os_string()
        .into_string()
        .unwrap();

    let database_url = data_dir + "/com.poozlehq.dev/" + "mydb.mysqlite3";
    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}
