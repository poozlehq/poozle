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
    created_after?: string;
    collection_id: string;
  };

  pathParams: {};
}

export interface GetTicketParams {
  queryParams: {
    collection_id: string;
  };
  pathParams: {
    ticket_id: string;
  };
}

export interface CreateTicketParams {
  requestBody: CreateTicketBody;
  queryParams: {
    collection_id: string;
  };

  pathParams: {};
}

export interface UpdateTicketParams {
  requestBody: UpdateTicketBody;
  queryParams: {
    collection_id: string;
  };

  pathParams: {
    ticket_id: string;
  };
}
