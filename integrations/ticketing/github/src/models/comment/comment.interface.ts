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

export interface GetCommentsParams {
  queryParams: {
    limit: number;
    cursor: string;

    created_after?: string;
  };

  pathParams: {
    collection_id: string;
    ticket_id: string;
  };
}

export interface GetCommentParams {
  pathParams: {
    collection_id: string;
    ticket_id: string;
    comment_id: string;
  };
}

export interface CreateCommentParams {
  requestBody: CreateCommentBody;

  pathParams: {
    collection_id: string;
    ticket_id: string;
  };
}

export interface UpdateCommentParams {
  requestBody: UpdateCommentBody;

  pathParams: {
    comment_id: string;
    collection_id: string;
    ticket_id: string;
  };
}
