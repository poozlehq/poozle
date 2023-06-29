/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CommentSchema } from '@poozle/engine-edk';

import { GetCommentsPath } from './get_comments.path';
import { GetCommentPath } from './get_comment.path';

export class GithubCommentModel extends BaseModel {
  constructor() {
    super('GithubCommentModel', CommentSchema);
  }

  paths() {
    return [
      new GetCommentsPath(/^\/?comments$/g, ['GET', 'POST'], this.schema),
      new GetCommentPath(/^\/?comments+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
