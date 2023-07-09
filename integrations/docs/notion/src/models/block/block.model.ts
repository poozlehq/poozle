/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, BlockSchema } from '@poozle/engine-idk';

import { BlocksPath } from './blocks.path';
export class NotionBlockModel extends BaseModel {
  constructor() {
    super('NotionBlockModel', BlockSchema);
  }

  paths() {
    return [new BlocksPath(/^\/?blocks+/g, ['GET', 'POST', 'PATCH'], this.schema)];
  }
}
