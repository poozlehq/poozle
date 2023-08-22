/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Comment, CreateCommentBody } from '@poozle/engine-idk';
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

export interface GetCommentsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    created_after?: string;
    ticket_id: string;
  };

  pathParams: {};
}

export interface CreateCommentsParams {
  queryParams: { ticket_id: string };

  pathParams: {};

  requestBody: CreateCommentBody;
}
