table! {
    commands (id) {
        id -> Integer,
        key -> Text,
        name -> Text,
        description -> Text,
        icon -> Text,
        data -> Text,
        extension_id -> Text,
        command_type -> Text,
    }
}

table! {
    spec (id) {
        id -> Integer,
        data -> Text,
        extension_id -> Text,
    }
}

allow_tables_to_appear_in_same_query!(
    commands,
    spec,
);
