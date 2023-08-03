/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Comment } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface CommentsResponse {
  data: Comment[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface CommentResponse {
  data: Comment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
