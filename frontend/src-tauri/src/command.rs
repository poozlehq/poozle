use std::process::Command;

#[tauri::command]
pub fn command_controller(path: String) -> Result<String, String> {
  let output = Command::new(path)
    .arg("commands")
    .output()
    .expect("failed to execute process");

  let json_string = String::from_utf8_lossy(&output.stdout);
  Ok(json_string.to_string())
}

#[tauri::command]
pub fn spec_controller(path: String) -> Result<String, String> {
  let output = Command::new(path)
    .arg("spec")
    .output()
    .expect("failed to execute process");

  let json_string = String::from_utf8_lossy(&output.stdout);
  Ok(json_string.to_string())
}

#[tauri::command]
pub fn get_action_data(path: String, action_id: String) -> Result<String, String> {
  let output = Command::new(path)
    .arg("do")
    .arg(action_id)
    .output()
    .expect("failed to execute process");

  let json_string = String::from_utf8_lossy(&output.stdout);
  Ok(json_string.to_string())
}

#[tauri::command]
pub fn fetch_data_for_id(path: String, fetch_data_id: String) -> Result<String, String> {
  let output = Command::new(path)
    .arg("fetchData")
    .arg(fetch_data_id)
    .arg("-a")
    .arg("{\"bearer_token\":\"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\"}")
    .output()
    .expect("failed to execute process");

  let json_string = String::from_utf8_lossy(&output.stdout);
  Ok(json_string.to_string())
}
