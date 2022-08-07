use std::fs;

use tauri::PathResolver;

pub fn load_command() {
    let paths = fs::read_dir(PathResolver::app_dir()).unwrap();

    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }
}

pub fn load_commands() {
    let paths = fs::read_dir("./").unwrap();

    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }
}
