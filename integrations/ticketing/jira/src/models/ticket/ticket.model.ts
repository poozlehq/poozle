/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TicketSchema } from '@poozle/engine-edk';

import { TicketPath } from './ticket.path';
import { TicketsPath } from './tickets.path';

export class JiraTicketModel extends BaseModel {
  constructor() {
    super('JiraTicketModel', TicketSchema);
  }

  paths() {
    return [
      new TicketsPath(/^\/?tickets$/g, ['GET', 'POST'], this.schema),
      new TicketPath(/^\/?tickets+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
