import { BaseModel, TagSchema } from '@poozle/engine-edk';
import { GetTagsPath } from './get_tags.path';

export class GithubTagModel extends BaseModel {
  constructor() {
    super('GithubTagModel', TagSchema);
  }

  paths() {
    return [new GetTagsPath(/^\/?tags$/g, 'GET', this.schema)];
  }
}
