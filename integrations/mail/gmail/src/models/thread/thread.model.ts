/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, ThreadSchema } from '@poozle/engine-idk';

import { ThreadPath } from './thread.path';
import { ThreadsPath } from './threads.path';

export class GmailThreadModel extends BaseModel {
  constructor() {
    super('GmailThreadModel', ThreadSchema);
  }

  paths() {
    return [
      new ThreadsPath(/^\/?threads$/g, ['GET', 'POST'], this.schema),
      new ThreadPath(/^\/?threads+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
