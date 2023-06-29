/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CommentSchema } from '@poozle/engine-edk';
import { GetCommentsPath } from './comments.path';
import {GetCommentPath} from './comment.path'


export class JiraCommentModel extends BaseModel {
  constructor() {
    super('JiraCommentModel', CommentSchema);
  }

  paths() {
    return [
      new GetCommentsPath(/^\/?comments$/g, ['GET', 'POST'], this.schema),
      new GetCommentPath(/^\/?comments+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
