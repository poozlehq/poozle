import { BaseModel, CommentSchema } from '@poozle/engine-edk';
import { GetCommentsPath } from './get_comments.path';

export class GithubCommentModel extends BaseModel {
  constructor() {
    super('GithubCommentModel', CommentSchema);
  }

  paths() {
    return [new GetCommentsPath(/^\/?comments$/g, 'GET', this.schema)];
  }
}
