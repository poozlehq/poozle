/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTicketBody, Ticket } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TicketWithRaw extends Ticket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  organization_id: string;
}

export interface TicketsResponse {
  data: TicketWithRaw[];
  meta: Meta;
}

export interface TicketResponse {
  data: TicketWithRaw;
}

export interface GetTicketsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    created_after: string;
  };

  pathParams: {
    organization_id: string;
    ticket_id: string;
  };
}

export interface GetTicketParams {
  pathParams: {
    ticket_id: string;
  };
}

export interface createBody extends CreateTicketBody {
  account_id: string;
  priority: string;
  status: string;
}

export interface CreateTicketParams {
  requestBody: createBody;

  pathParams: {
    account_id: string;
  };
}

export interface UpdateTicketParams {
  requestBody: createBody;

  pathParams: {
    account_id: string;
    ticket_id: string;
  };
}
