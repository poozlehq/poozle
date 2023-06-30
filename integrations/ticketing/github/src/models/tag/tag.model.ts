/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TagSchema } from '@poozle/engine-edk';

import { TagPath } from './tag.path';
import { TagsPath } from './tags.path';

export class GithubTagModel extends BaseModel {
  constructor() {
    super('GithubTagModel', TagSchema);
  }

  paths() {
    return [
      new TagsPath(/^\/?tags$/g, ['GET', 'POST'], this.schema),
      new TagPath(/^\/?tags$/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
