/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetTicketParams, TicketResponse, UpdateTicketParams } from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';

export class TicketPath extends BasePath {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<TicketResponse> {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertTicket(response.data, params.pathParams?.collection_id as string | null),
    };
  }

  async patchTicket(
    url: string,
    headers: AxiosHeaders,
    params: UpdateTicketParams,
  ): Promise<TicketResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, ticketMappings);
    const response = await axios.patch(url, createBody, { headers });

    return {
      data: convertTicket(response.data, params.queryParams?.collection_id as string | null),
    };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: UpdateTicketParams | GetTicketParams,
    config: Config,
  ) {
    const url = `${BASE_URL}/repos/${config.org}/${params.queryParams?.collection_id}/issues/${params.pathParams?.ticket_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params as GetTicketParams);

      case 'PATCH':
        await this.patchTicket(url, headers, params as UpdateTicketParams);
        return this.fetchSingleTicket(url, headers, params as GetTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
