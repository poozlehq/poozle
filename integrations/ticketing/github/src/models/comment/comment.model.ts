/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CommentSchema } from '@poozle/engine-idk';

import { CommentPath } from './comment.path';
import { CommentsPath } from './comments.path';

export class GithubCommentModel extends BaseModel {
  constructor() {
    super('GithubCommentModel', CommentSchema);
  }

  paths() {
    return [
      new CommentsPath(/^\/?comments$/g, ['GET', 'POST'], this.schema),
      new CommentPath(/^\/?comments+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
