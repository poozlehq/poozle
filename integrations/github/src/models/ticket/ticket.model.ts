import { BaseModel, TicketSchema } from '@poozle/engine-edk';
import { GetTicketsPath } from './get_tickets.path';
import { PostTicketsPath } from './post_tickets.path';
import { PutTicketsPath } from './put_tickets.path';

export class GithubTicketModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', TicketSchema);
  }

  paths() {
    return [
      new GetTicketsPath(/^\/?tickets$/g, 'GET', this.schema),
      new PostTicketsPath(/^\/?tickets$/g, 'POST', this.schema),
      new PutTicketsPath(/^\/?tickets$/g, 'PUT', this.schema),
    ];
  }
}
