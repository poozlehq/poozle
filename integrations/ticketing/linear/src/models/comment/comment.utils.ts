/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CommentWithRaw } from './comment.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComment(data: any): CommentWithRaw {
  return {
    id: data.id,
    ticket_id: data.issue_url.match(/\/(\d+)$/)?.[1],
    body: data.body,
    html_body: '',
    is_private: false,
    created_by_id: data.user.id,
    created_by: data.user.login,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    raw: data,
  };
}
