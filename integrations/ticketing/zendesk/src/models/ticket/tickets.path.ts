/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import {
  CreateTicketParams,
  GetTicketsParams,
  TicketResponse,
  TicketsResponse,
} from './ticket.interface';
import { convertCreateUpdateBody, convertTicket } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    params: GetTicketsParams,
  ): Promise<TicketsResponse> {
    const final_params = {
      per_page: params.queryParams.limit,
      ...(params.queryParams.cursor || params.queryParams.created_after
        ? {
            start_time: params.queryParams.cursor
              ? params.queryParams.cursor
              : params.queryParams.created_after,
          }
        : {}),
    };
    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.tickets.map((data: any) => convertTicket(data)),
      meta: getMetaParams(response.data, ''),
    };
  }

  async createTicket(
    url: string,
    headers: AxiosHeaders,
    params: CreateTicketParams,
  ): Promise<TicketResponse> {
    const response = await axios.post(url, convertCreateUpdateBody(params.requestBody), {
      headers,
    });

    return {
      data: convertTicket(response.data.ticket),
    };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTicketsParams | CreateTicketParams,
    _config: Config,
  ) {
    let url = `${BASE_URL}/tickets`;

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/incremental/tickets`;
        return this.fetchData(url, headers, params as GetTicketsParams);

      case 'POST':
        return this.createTicket(url, headers, params as CreateTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
