import { BaseModel, TagSchema } from '@poozle/engine-edk';
import { GetTagsPath } from './get_tags.path';
import { PostTagsPath } from './post_tags.path';
import { PutTagsPath } from './put_tags.path';

export class GithubTagModel extends BaseModel {
  constructor() {
    super('GithubTagModel', TagSchema);
  }

  paths() {
    return [
      new GetTagsPath(/^\/?tags$/g, 'GET', this.schema),
      new PostTagsPath(/^\/?tags$/g, 'POST', this.schema),
      new PutTagsPath(/^\/?tags$/g, 'PUT', this.schema),
    ];
  }
}
