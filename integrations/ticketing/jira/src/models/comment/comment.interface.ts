/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Comment, CreateCommentBody, UpdateCommentBody } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface CommentWithRaw extends Comment {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface CommentsResponse {
  data: CommentWithRaw[];
  meta: Meta;
}

export interface CommentResponse {
  data: CommentWithRaw;
}

export interface GetCommentParams {
  queryParams: {
    ticket_id: string;
  };
  pathParams: {
    comment_id: string;
  };
}

export interface UpdateCommentParams extends GetCommentParams {
  requestBody: UpdateCommentBody;
}

export interface GetCommentsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    ticket_id: string;
  };

  pathParams: {};
}
export interface CreateCommentParams {
  requestBody: CreateCommentBody;

  queryParams: {
    ticket_id: string;
  };
  pathParams: {};
}
