/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { convertTimestampToTZFormat } from 'common';

import { CommentWithRaw } from './comment.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComments(data: any, collection_id: string | null): CommentWithRaw {
  return {
    id: data.id,
    ticket_id: collection_id ? collection_id : '',
    body: data.body,
    created_by_id: data.author.accountId,
    created_by: { id: data.author.accountId, username: data.author.displayName },
    is_private: data.jsdPublic,
    created_at: convertTimestampToTZFormat(data.created),
    updated_at: convertTimestampToTZFormat(data.updated),

    // extra
    html_body: '',

    // Raw
    raw: data,
  };
}
