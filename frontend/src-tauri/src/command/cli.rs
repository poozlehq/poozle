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
pub fn get_action_data(
    path: String,
    callback_id: String,
    params: String,
    spec_data: String,
) -> Result<String, String> {
    let output = Command::new(path)
        .arg("do")
        .arg(callback_id)
        .arg("-p")
        .arg(params)
        .arg("-s")
        .arg(spec_data)
        .output()
        .expect("failed to execute process");

    let json_string = String::from_utf8_lossy(&output.stdout);
    Ok(json_string.to_string())
}

#[tauri::command]
pub fn fetch_data_for_id(
    path: String,
    fetch_data_id: String,
    spec_data: String,
) -> Result<String, String> {
    let output = Command::new(path)
        .arg("fetchData")
        .arg(fetch_data_id)
        .arg("-s")
        .arg(spec_data)
        .output()
        .expect("failed to execute process");
    let json_string = String::from_utf8_lossy(&output.stdout);
    Ok(json_string.to_string())
}
