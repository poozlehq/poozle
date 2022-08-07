#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod command;
mod database;
mod system_tray;

use tauri::{RunEvent, SystemTray};

fn main() {
  let state = database::run();

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
