#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Start of DB example
// use super::db::{};
#[macro_use]
extern crate diesel;
extern crate diesel_migrations;

use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use tauri::{ RunEvent, SystemTray};

mod command;
mod db;
mod schema;
mod system_tray;

fn main() {
    pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();
    let mut conn = db::establish_connection();

    conn.run_pending_migrations(MIGRATIONS).unwrap();

    fix_path_env::fix();

    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(system_tray::get_system_tray_menu()))
        .on_system_tray_event(system_tray::on_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            // Below are commands to fetch data from database
            command::commands::get_all_commands,
            command::commands::create_command,
            command::commands::get_command,
            command::commands::delete_commands,
            command::commands::save_spec,
            command::commands::get_spec,
            command::commands::update_spec,
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    // let window = app.get_window("main").unwrap();

    // #[cfg(target_os = "macos")]
    // set_shadow(&window, true).expect("Unsupported platform!");

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
