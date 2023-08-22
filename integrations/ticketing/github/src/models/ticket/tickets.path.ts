/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody, CreateTicketBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import {
  CreateTicketParams,
  GetTicketsParams,
  TicketResponse,
  TicketsResponse,
} from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    params: GetTicketsParams,
  ): Promise<TicketsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

    const limit = params.queryParams.limit ?? 10;

    const final_params = {
      per_page: limit,
      since: params.queryParams?.created_after,
      state: 'all',
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    const responseData = response.data;

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: responseData.map((data: any) =>
        convertTicket(data, params.queryParams?.collection_id as string | null),
      ),

      meta: getMetaParams(response.data, limit, page),
    };
  }

  async createTicket(
    url: string,
    headers: AxiosHeaders,
    params: CreateTicketParams,
  ): Promise<TicketResponse> {
    const body: CreateTicketBody = params.requestBody as CreateTicketBody;
    const createBody = convertToRequestBody(body, ticketMappings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createBody.assignees = createBody.assignees.map((assignee: any) => assignee.id);

    const response = await axios.post(url, createBody, { headers });

    return {
      data: convertTicket(response.data, params.queryParams?.collection_id as string | null),
    };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTicketsParams | CreateTicketParams,
    config: Config,
  ) {
    const url = `${BASE_URL}/repos/${config.org}/${params.queryParams?.collection_id}/issues`;

    switch (method) {
      case 'GET':
        return this.fetchData(url, headers, params as GetTicketsParams);

      case 'POST':
        return this.createTicket(url, headers, params as CreateTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
