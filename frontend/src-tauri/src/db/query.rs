use crate::db;
use crate::db::models::Spec;
use crate::schema::*;
use diesel::prelude::*;

use super::models::NewSpec;
use super::models::UpdateSpec;

use super::models::{Command, NewCommand};

pub fn commands_list() -> String {
    let connection = &mut db::establish_connection();
    let all_commands = commands::dsl::commands
        .load::<Command>(connection)
        .expect("Expect loading commands");
    let serialized = serde_json::to_string(&all_commands).unwrap();
    serialized
}

pub fn get_command_from_id(extension_id: String, command_key: String) -> String {
    let connection = &mut db::establish_connection();
    println!("{}", extension_id);
    println!("{}", command_key);
    let command = commands::dsl::commands
        .filter(commands::extension_id.eq(extension_id.as_str()).and(commands::key.eq(command_key.as_str())))
        .load::<Command>(connection)
        .expect("Command not found");
    let serialized = serde_json::to_string(&command).unwrap();
    serialized
}

pub fn create_command(new_command: NewCommand) -> String {
    let connection = &mut db::establish_connection();

    let command = diesel::insert_into(commands::table)
        .values(&new_command)
        .execute(connection)
        .expect("Error saving new command");
    let command_json = serde_json::to_string(&command).unwrap();
    command_json
}

pub fn delete_commands(extension_id: String) {
    let connection = &mut db::establish_connection();

    diesel::delete(commands::table)
        .filter(commands::extension_id.eq(extension_id.as_str()))
        .execute(connection)
        .expect("Error deleting commands");
}

pub fn create_spec(new_spec: NewSpec) -> String {
    let connection = &mut db::establish_connection();

    let authentication_details = diesel::insert_into(spec::table)
        .values(&new_spec)
        .execute(connection)
        .expect("Error saving new authentication details");
    let spec_json = serde_json::to_string(&authentication_details).unwrap();
    spec_json
}

pub fn update_spec(new_spec: UpdateSpec) -> String {
    let connection = &mut db::establish_connection();

    let authentication_details = diesel::insert_into(spec::table)
        .values(&new_spec)
        .on_conflict(spec::id)
        .do_update()
        .set(&new_spec)
        .execute(connection)
        .expect("Error saving new authentication details");
    let spec_json = serde_json::to_string(&authentication_details).unwrap();
    spec_json
}

pub fn get_spec(ext_id: &str) -> Result<Spec, String> {
    let connection = &mut db::establish_connection();

    use spec::dsl::extension_id;

    let spec = spec::dsl::spec
        .filter(extension_id.eq(ext_id))
        .first::<Spec>(connection);

    if let Ok(result) = spec {
        Ok(result)
    } else {
        Err("Spec not found".into())
    }
}
