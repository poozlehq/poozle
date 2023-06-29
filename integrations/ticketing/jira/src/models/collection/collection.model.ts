/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, CollectionSchema } from '@poozle/engine-edk';
import { GetCollectionPath } from './collection.path';

import { GetCollectionsPath } from './collections.path';

export class JiraCollectionModel extends BaseModel {
  constructor() {
    super('JiraCollectionModel', CollectionSchema);
  }

  paths() {
    return [
      new GetCollectionsPath(/^\/?collections$/g, 'GET', this.schema),
      new GetCollectionPath(/^\/?collections+/g, 'GET', this.schema),
    ];
  }
}
