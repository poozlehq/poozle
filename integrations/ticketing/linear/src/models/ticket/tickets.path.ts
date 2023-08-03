/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  convertToRequestBody,
  CreateTicketBody,
  Params,
} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TicketResponse, TicketsResponse } from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(headers: AxiosHeaders, params: Params): Promise<TicketsResponse> {

  }

  async createTicket(headers: AxiosHeaders, params: Params): Promise<TicketResponse> {

  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {

    switch (method) {
      case 'GET':
        return this.fetchData(headers, params);

      case 'POST':
        return this.createTicket(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
