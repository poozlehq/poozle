/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CommentSchema } from '@poozle/engine-edk';

import { GetCommentPath } from './comment';
import { GetCommentsPath } from './comments';

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
