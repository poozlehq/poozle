extern crate reqwest;

use crate::db::{
    self,
    models::{NewCommand, NewSpec, Spec, UpdateSpec},
};

#[tauri::command]
pub fn get_all_commands() -> String {
    db::query::commands_list()
}

#[tauri::command]
pub fn create_command(
    command_key: String,
    extension_id: String,
    name: String,
    description: String,
    icon: String,
    data: String,
    command_type: String,
    has_quick_action: bool,
) {
    let new_command = NewCommand {
        key: command_key.as_str(),
        name: name.as_str(),
        description: description.as_str(),
        // TODO (harshith) deprecate this icon
        icon: icon.as_str(),
        data: data.as_str(),
        command_type: command_type.as_str(),
        extension_id: extension_id.as_str(),
        has_quick_action,
    };

    db::query::create_command(new_command);
}

#[tauri::command]
pub fn delete_commands(extension_id: String) {
    db::query::delete_commands(extension_id)
}

#[tauri::command]
pub fn get_command(extension_id: String, command_key: String) {
    db::query::get_command_from_id(extension_id, command_key);
}

#[tauri::command]
pub fn save_spec(spec: String, extension_id: String) {
    let new_spec = NewSpec {
        data: spec.as_str(),
        extension_id: &extension_id,
    };

    db::query::create_spec(new_spec);
}

#[tauri::command]
pub fn update_spec(spec: String, extension_id: String, id: i32) {
    let new_spec = UpdateSpec {
        data: spec.as_str(),
        extension_id: &extension_id,
        id,
    };

    db::query::update_spec(new_spec);
}

#[tauri::command]
pub fn get_spec(extension_id: String) -> Result<Spec, String> {
    db::query::get_spec(&extension_id)
}
