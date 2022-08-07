#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Start of DB example
// use super::db::{};
#[macro_use]
extern crate diesel;
extern crate diesel_migrations;

use diesel::prelude::*;
use std::sync::Mutex;
use tauri::{RunEvent, SystemTray};

mod command;
mod db;
mod schema;
mod seed;
mod system_tray;

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

fn main() {
    let state = run();

    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(system_tray::get_system_tray_menu()))
        .on_system_tray_event(system_tray::on_system_tray_event)
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            command::command_controller,
            command::get_action_data,
            command::fetch_data_for_id,
            command::spec_controller
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    #[cfg(target_os = "macos")]
    app.set_activation_policy(tauri::ActivationPolicy::Accessory);

    app.run(|_app_handle, e| match e {
        // Keep the event loop running even if all windows are closed
        // This allow us to catch system tray events when there is no window
        RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    })
}
