/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CommentSchema } from '@poozle/engine-edk';

import { GetCommentsPath } from './get_comments.path';
import { PostCommentsPath } from './post_comments.path';
import { PutCommentsPath } from './put_comments.path';

export class GithubCommentModel extends BaseModel {
  constructor() {
    super('GithubCommentModel', CommentSchema);
  }

  paths() {
    return [
      new GetCommentsPath(/^\/?comments$/g, 'GET', this.schema),
      new PostCommentsPath(/^\/?comments$/g, 'POST', this.schema),
      new PutCommentsPath(/^\/?comments$/g, 'PUT', this.schema),
    ];
  }
}
