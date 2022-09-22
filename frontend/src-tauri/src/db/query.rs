use crate::db;
use crate::db::models::Spec;
use crate::schema::*;
use diesel::prelude::*;

use super::models::NewSpec;
use super::models::{Command, NewCommand};

pub fn commands_list() -> String {
    let connection = &mut db::establish_connection();
    let all_commands = commands::dsl::commands
        .load::<Command>(connection)
        .expect("Expect loading commands");
    let serialized = serde_json::to_string(&all_commands).unwrap();
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

pub fn create_spec(new_spec: NewSpec) -> String {
    let connection = &mut db::establish_connection();

    let authentication_details = diesel::insert_into(spec::table)
        .values(&new_spec)
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
