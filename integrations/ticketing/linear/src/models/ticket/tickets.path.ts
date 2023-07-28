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
  async fetchData(url: string, headers: AxiosHeaders, params: Params): Promise<TicketsResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async createTicket(url: string, headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `---------------- URL ------------------`;

    switch (method) {
      case 'GET':
        return this.fetchData(url, headers, params);

      case 'POST':
        return this.createTicket(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
