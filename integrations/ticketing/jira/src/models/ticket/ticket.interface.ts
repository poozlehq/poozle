/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTicketBody, Ticket, UpdateTicketBody } from '@poozle/engine-idk';

export interface TicketWithRaw extends Ticket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

/* eslint-disable notice/notice */
export interface FetchTicketParams {
  pathParams: {
    collection_id: string;
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
  };

  pathParams: {
    collection_id: string;
  };
}

export interface CreateTicketParams {
  queryParams: {
    limit: number;
    cursor?: string;
  };

  requestBody: CreateTicketBody;
  pathParams: {
    collection_id: string;
  };

  customFields?: Record<string, unknown>;
}
