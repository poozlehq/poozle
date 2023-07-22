/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CommentWithRaw } from './comment.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComment(data: any): CommentWithRaw {
  return {
    id: data.id.toString(),
    ticket_id: data.issue_url.match(/\/(\d+)$/)?.[1],
    body: data.body,
    html_body: '',
    is_private: false,
    created_by_id: data.user.id.toString(),
    created_by: {id: data.user.id.toString(), username: data.user.login},
    created_at: data.created_at,
    updated_at: data.updated_at,

    // Raw
    raw: data,
  };
}
