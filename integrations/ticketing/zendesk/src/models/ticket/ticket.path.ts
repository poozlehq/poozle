/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetTicketParams, TicketResponse, UpdateTicketParams } from './ticket.interface';
import { convertCreateUpdateBody, convertTicket } from './ticket.utils';

export class TicketPath extends BasePath {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    _params: GetTicketParams,
  ): Promise<TicketResponse> {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertTicket(response.data),
    };
  }

  async patchTicket(
    url: string,
    headers: AxiosHeaders,
    params: UpdateTicketParams,
  ): Promise<TicketResponse> {
    const response = await axios.patch(url, convertCreateUpdateBody(params.requestBody), {
      headers,
    });

    return {
      data: convertTicket(response.data),
    };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTicketParams | UpdateTicketParams,
    _config: Config,
  ) {
    const url = `${BASE_URL}/tickets/${params.pathParams.ticket_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params as GetTicketParams);

      case 'PATCH':
        await this.patchTicket(url, headers, params as UpdateTicketParams);
        return this.fetchSingleTicket(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
