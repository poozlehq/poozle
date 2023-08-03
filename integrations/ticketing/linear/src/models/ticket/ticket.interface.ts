/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTicketBody, Ticket, UpdateTicketBody } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TicketsResponse {
  data: Ticket[];
  meta: Meta;
}

export interface TicketResponse {
  data: Ticket;
}

export interface GetTicketsParams {
  queryParams: {
    limit: number;
    cursor: string;
    created_after?: string;
  };

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

export interface CreateTicketParams {
  requestBody: CreateTicketBody;

  pathParams: {
    collection_id: string;
  };
}
