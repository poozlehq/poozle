/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function convertComments(data: any, collection_id: string | null) {
  return {
    id: data.id,
    ticket_id: collection_id ? collection_id : undefined,
    body: data.body,
    created_by_id: data.author.accountId,
    created_by: { id: data.author.accountId, username: data.author.displayName },
    is_private: data.jsdPublic,
    created_at: data.created,
    updated_at: data.updated,
    raw_data: data,
  };
}
