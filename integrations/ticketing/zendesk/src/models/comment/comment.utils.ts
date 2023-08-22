/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Creator } from '@poozle/engine-idk';
import { CommentWithRaw } from './comment.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComment(data: any, ticketId: string): CommentWithRaw {
  return {
    id: data.id,
    ticket_id: ticketId,
    body: data.body,
    html_body: data.html_body,
    is_private: !data.public ?? false,
    created_by_id: data.author_id,
    created_by: {} as Creator,
    created_at: data.created_at,
    updated_at: '',
    raw: data,
  };
}
