/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Ticket } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TicketsResponse {
  data: Ticket[];
  meta: Meta;
}

export interface TicketResponse {
  data: Ticket;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
