/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTicketBody, Ticket, UpdateTicketBody } from '@poozle/engine-idk';

export interface TicketWithRaw extends Ticket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

/* eslint-disable notice/notice */
export interface FetchTicketParams {
  queryParams: {
    collection_id: string;
  };
  pathParams: {
    ticket_id: string;
  };
}

export interface UpdateTicketParams extends FetchTicketParams {
  requestBody: UpdateTicketBody;
}

export interface FetchTicketsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    created_after?: string;
    collection_id: string;
  };

  pathParams: {};
}

export interface CreateTicketParams {
  queryParams: {
    limit: number;
    cursor?: string;
    collection_id: string;
  };

  requestBody: CreateTicketBody;
  pathParams: {};
}
