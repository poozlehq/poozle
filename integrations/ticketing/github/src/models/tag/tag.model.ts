/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TagSchema } from '@poozle/engine-edk';

import { GetTagsPath } from './get_tags.path';
import { GetTagPath } from './get_tag.path';

export class GithubTagModel extends BaseModel {
  constructor() {
    super('GithubTagModel', TagSchema);
  }

  paths() {
    return [
      new GetTagsPath(/^\/?tags$/g, ['GET', 'POST'], this.schema),
      new GetTagPath(/^\/?tags$/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
