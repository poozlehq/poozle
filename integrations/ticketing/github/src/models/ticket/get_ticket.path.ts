/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody, Params, PathResponse, Ticket } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTicket, ticketMappings } from './ticket.utils';

const BASE_URL = 'https://api.github.com';

export class GetTicketPath extends BasePath<Ticket> {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<PathResponse<Ticket>> {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertTicket(response.data, params.pathParams?.collection_id as string | null);
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchTicket(url: string,
    headers: AxiosHeaders,
    params: Params,): Promise<PathResponse<Ticket>> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, ticketMappings);
    const response = await axios.post(url, createBody, { headers });

    return convertTicket(response.data, params.pathParams?.collection_id as string | null)

  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Ticket>> {
    
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params);

      case 'PATCH':
        await this.patchTicket(url, headers, params);
        return this.fetchSingleTicket(url, headers, params);

      default:
        return {};
    }
    
  }
}
