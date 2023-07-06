/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, PageSchema } from '@poozle/engine-idk';

import { GetPagePath } from './page.path';
import { GetPagesPath } from './pages.path';
export class NotionPageModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', PageSchema);
  }

  paths() {
    return [
      new GetPagesPath(/^\/?pages$/g, ['GET', 'POST'], this.schema),
      new GetPagePath(/^\/?pages+/g, ['GET'], this.schema),
    ];
  }
}
