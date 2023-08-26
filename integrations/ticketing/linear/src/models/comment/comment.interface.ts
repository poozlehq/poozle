/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Comment, UpdateCommentBody } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface CommentWithRaw extends Comment {
  raw: any;
}
export interface CommentsResponse {
  data: CommentWithRaw[];
  meta: Meta;
}

export interface CommentResponse {
  data: CommentWithRaw;
}

export interface MutateCommentResponse {
  data: CommentWithRaw;
  success: boolean;
  lastSyncId: number;
}

export interface UpdateCommentParams {
  requestBody: UpdateCommentBody;

  pathParams: {
    comment_id: string;
    collection_id: string;
    ticket_id: string;
  };
}
