table! {
    authentication (id) {
        id -> Integer,
        data -> Text,
        extension_id -> Text,
    }
}

table! {
    commands (id) {
        id -> Integer,
        key -> Text,
        name -> Text,
        description -> Text,
        icon -> Text,
        data -> Text,
        extension_id -> Text,
        extension_path -> Text,
    }
}

allow_tables_to_appear_in_same_query!(
    authentication,
    commands,
);
