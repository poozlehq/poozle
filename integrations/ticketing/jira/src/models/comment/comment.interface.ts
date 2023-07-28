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
  pathParams: {
    ticket_id: string;
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
  };

  pathParams: {
    ticket_id: string;
  };
}
export interface CreateCommentParams {
  requestBody: CreateCommentBody;

  pathParams: {
    ticket_id: string;
  };
}
