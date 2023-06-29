import { BaseModel, TicketSchema } from '@poozle/engine-edk';
import { TicketsPath } from './tickets.path';
import { TicketPath } from './ticket.path';

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
