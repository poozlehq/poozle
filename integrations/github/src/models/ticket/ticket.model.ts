import { BaseModel, TicketSchema } from '@poozle/engine-edk';
import { GetTicketsPath } from './get_tickets.path';

export class GithubTicketModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', TicketSchema);
  }

  paths() {
    return [new GetTicketsPath(/^\/?tickets$/g, 'GET', this.schema)];
  }
}
