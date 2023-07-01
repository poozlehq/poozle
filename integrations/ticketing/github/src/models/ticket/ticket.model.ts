/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TicketSchema } from '@poozle/engine-idk';

import { GetTicketPath } from './ticket.path';
import { GetTicketsPath } from './tickets.path';
export class GithubTicketModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', TicketSchema);
  }

  paths() {
    return [
      new GetTicketsPath(/^\/?tickets$/g, ['GET', 'POST'], this.schema),
      new GetTicketPath(/^\/?tickets+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
