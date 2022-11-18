extern crate reqwest;

use crate::db::{
    self,
    models::{NewCommand, NewSpec, Spec},
};

// pub async fn download_file() -> Result<(), Error> {
//     println!("{}", "Running");
//     let data_dir = tauri::api::path::data_dir()
//         .unwrap()
//         .into_os_string()
//         .into_string()
//         .unwrap();
//     let database_url = data_dir + "/com.poozlehq.dev/";

//     let target = "https://poozle-temp.s3.ap-south-1.amazonaws.com/test/getapps.tar.gz?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiAyXdr7usGVfRfH25jBbiiWFNo%2BQPUdu85hpDsQwyGHJQIgYjuUY2n8%2FRwFSk7LYbtZs6J9ZlOplDu7iAT5kPj1K7Mq%2BwIIdhABGgw3MjI5NjY1NDA3NzMiDGgRseRtYk%2F3Ocl49SrYAiCK2A23mXQSb9RyNybVQ3WQYGsaedKPhrAczww%2Fvq%2FEVZgQp5rSqq8F92XQaIAs421k8Idg1tF%2FgjcY58E3KcCxOaeSWaQS8DZJRJvEN9pG0tiOnPSDC1nyyfHcUoHeQ7qCQ5ux1Os9YaevtSns1wmbSMpe%2FKA4ZhiEoikK4x8XnCvNQeH%2FJAxfrOuzrCFVCGwCgOYp9ri91QqG%2BGU%2Bfmaj7Jxe9Bx2PkzDBqGaMLUIuk6qiFLKwRmlnmqVidnm5uATj27dpvpKXlYMbD0ayVO4hm3mffwjBChdh18LoxCPjb8blSDIQ6qVO20ifrZ5%2FPlEcN2o3NVI%2BjIHBkywlQUJ9npLMTS7bb8NeNruuAGNbSOUDqYX12FqQPOuydN%2BadVnCKizCuE4rsOQJm2M5tzAwc70B8OrIGHoaIHDaoj2f2KjH07PXTIpwIka5xCzFB2CV7Yva%2B4fMKmGrJkGOrQCzcghr3WlWJ1beBNI3v7ORv%2BBp3JSdiA6G%2BJMMqvSdq9260K7wFMIjGSsOo1FRiyc%2BHmMUF%2FwfCjqNvwTb9QuBRePzngOsJBPB9eZqhxtAxabpwBg%2BwKUpjbR%2FlWKB3eQ3EyahYQU9QF95jjUZwBJZnmxfJvozVYi6Kp7qCTjEra1gisKXMzpm%2FnMKU8bz6fOjVXjLCqDhPKnlXpH3BKranMnRri45PYoDdVttLKDmd1MbG7FPUibH3TawivXiWdxwFtKLmcE7nk%2BHQuILpxdoKjNCCwXj2AADy%2BQEGvDli62IY8vg4AfmCAWG1G5WQfBI%2BiLMRif8vHGafqEwzZRgkYprt2BvxBiCinw7vTVnUs2IdCJk1qb288tNZWyzKEtpYkiqWMsfVAnJpFcgubM9DWnJE0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220921T131125Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA2QVBJ6HS5KR4A7WQ%2F20220921%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fc9cd934cdfad03a03f4e8bea4ac7a2b731bc9fd0111839ae3f3db85fb09377a";

//     let response = reqwest::get(target).await.unwrap();

//     let mut dest = {
//         let fname = response
//             .url()
//             .path_segments()
//             .and_then(|segments| segments.last())
//             .and_then(|name| if name.is_empty() { None } else { Some(name) })
//             .unwrap_or("tmp.bin");

//         println!("file to download: '{}'", fname);
//         println!("will be located under: '{:?}'", fname);
//         File::create(database_url + "getapps.tar.gz")?
//     };
//     let contents = response.bytes().await.unwrap();
//     let mut content = Cursor::new(contents);
//     copy(&mut content, &mut dest)?;
//     Ok(())
// }

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
pub fn get_spec(extension_id: String) -> Result<Spec, String> {
    db::query::get_spec(&extension_id)
}
