/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TicketSchema } from '@poozle/engine-edk';

import { GetTicketsPath } from './get_tickets.path';
import {GetTicketPath} from './get_ticket.path'
export class GithubTicketModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', TicketSchema);
  }

  paths() {
    return [
      new GetTicketsPath(/^\/?tickets$/g, ['GET', 'POST'], this.schema),
      new GetTicketPath(/^\/?tickets+/g, ['GET', 'PUT'], this.schema),
    ];
  }
}
