/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, MessageSchema } from '@poozle/engine-idk';

import { GetMessagePath } from './message.path';
import { GetMessagesPath } from './messages.path';
export class GmailMessageModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', MessageSchema);
  }

  paths() {
    return [
      new GetMessagesPath(/^\/?messages$/g, ['GET', 'POST'], this.schema),
      new GetMessagePath(/^\/?messages+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
