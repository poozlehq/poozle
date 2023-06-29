import { Comment } from '@poozle/engine-edk';

export function convertComments(data: any, collection_id: string | null): Partial<Comment> {
  return {
    id: data.id,
    ticket_id: collection_id ? collection_id : undefined,
    body: data.body,
    created_by_id: data.author.accountId,
    created_by: {id: data.author.accountId, username: data.author.displayName},
    is_private: data.jsdPublic,
    created_at: data.created,
    updated_at: data.updated
  };
}