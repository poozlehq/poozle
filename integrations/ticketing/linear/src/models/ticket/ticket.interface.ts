/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Ticket } from '@poozle/engine-idk';
import { Meta } from 'common';
import { LinearUser } from '../user/user.interface';

export interface LinearIssue extends Omit<Ticket, 'assignees' | 'collection_id'> {
  archived_at: Date;
  assignee: LinearUser;
  estimate: number;
}
export interface TicketsResponse {
  data: LinearIssue[];
  // meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // raw: any;
}

export interface TicketResponse {
  data: LinearIssue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // raw: any;
}

export interface TicketParams {
  pathParams: {
    ticket_id: number;
  };
}
