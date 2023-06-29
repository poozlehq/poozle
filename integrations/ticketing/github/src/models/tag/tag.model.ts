/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TagSchema } from '@poozle/engine-edk';

import { GetTagPath } from './tag';
import { GetTagsPath } from './tags';

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
