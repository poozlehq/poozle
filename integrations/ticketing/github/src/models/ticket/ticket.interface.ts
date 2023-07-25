/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTicketBody, Ticket, UpdateTicketBody } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TicketWithRaw extends Ticket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
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
    cursor: string;
    since?: string;
  };

  pathParams: {
    collection_id: string;
  };
}

export interface GetTicketParams {
  pathParams: {
    collection_id: string;
    ticket_id: string;
  };
}

export interface CreateTicketParams {
  requestBody: CreateTicketBody;

  pathParams: {
    collection_id: string;
  };
}

export interface UpdateTicketParams {
  requestBody: UpdateTicketBody;

  pathParams: {
    ticket_id: string;
    collection_id: string;
  };
}
