/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CollectionSchema } from '@poozle/engine-edk';

import { GetCollectionsPath } from './collections';

export class GithubCollectionModel extends BaseModel {
  constructor() {
    super('GithubCollectionModel', CollectionSchema);
  }

  paths() {
    return [new GetCollectionsPath(/^\/?collections$/g, 'GET', this.schema)];
  }
}
