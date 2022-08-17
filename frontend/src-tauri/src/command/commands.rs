use std::{fs, process::Command, sync::Mutex};

use diesel::SqliteConnection;
use serde_json::Value;

use crate::db::{
    self,
    models::{NewCommand, NewSpec, Spec},
};

pub struct AppState {
    count: Mutex<i64>,
    conn: Mutex<SqliteConnection>,
}

pub fn run() -> AppState {
    let state = AppState {
        count: Default::default(),
        conn: Mutex::new(db::establish_connection()),
    };

    return state;
}

pub fn create_new_command(con: &SqliteConnection, extension_id: &String, extension_path: &String) {
    let file_path = extension_path.to_owned() + "/" + extension_id;
    println!("{:?}", file_path);
    let output = Command::new(file_path.to_owned())
        .arg("commands")
        .output()
        .expect("failed to execute process");

    println!("{:?}", output);
    let string = String::from_utf8_lossy(&output.stdout).to_string();
    let values: Value = serde_json::from_str(&string).unwrap();
    let records = &values["record"].as_array().unwrap();
    for record in records.iter() {
        let record_object = record.as_object().unwrap();
        let new_command = NewCommand {
            key: record_object["key"].as_str().unwrap(),
            name: record_object["name"].as_str().unwrap(),
            description: record_object["description"].as_str().unwrap(),
            icon: record_object["icon"].as_str().unwrap(),
            data: "",
            extension_path: &file_path,
            extension_id: &extension_id,
        };

        db::query::create_command(&con, new_command);
    }
}

#[tauri::command]
pub fn get_all_commands(state: tauri::State<AppState>) -> String {
    let con = state.conn.lock().unwrap();
    db::query::commands_list(&con)
}

#[tauri::command]
pub fn prefill_all_commands(state: tauri::State<AppState>, base_path: String) {
    let con = state.conn.lock().unwrap();
    let extension_path = base_path + "extensions";
    let paths = fs::read_dir(&extension_path).unwrap();

    for path in paths {
        let extension_id = path.unwrap().file_name().into_string().unwrap();
        create_new_command(&con, &extension_id, &extension_path);
    }
}

#[tauri::command]
pub fn save_spec(state: tauri::State<AppState>, spec: String, extension_id: String) {
    let con = state.conn.lock().unwrap();
    let new_spec = NewSpec {
        data: spec.as_str(),
        extension_id: &extension_id,
    };

    db::query::create_spec(&con, new_spec);
}

#[tauri::command]
pub fn get_spec(state: tauri::State<AppState>, extension_id: String) -> Result<Spec, String> {
    let con = state.conn.lock().unwrap();

    db::query::get_spec(&con, &extension_id)
}
