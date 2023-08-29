/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  convertToRequestBody,
  CreateTicketBody,
  Params,
} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import {BASE_URL, getMetaParams} from 'common';

import { TicketResponse, TicketsResponse } from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params): Promise<TicketsResponse> {
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
      data: responseData.map((data: any) =>
          convertTicket(data, params.pathParams?.collection_id as string | null),
      ),

      meta: getMetaParams(response.data, limit, page),
    };
  }

  async createTicket(url: string, headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    const body: CreateTicketBody = params.requestBody as CreateTicketBody;
    const createBody = convertToRequestBody(body, ticketMappings);

    const response = await axios.post(url, createBody, { headers });

    return {
      raw: response.data.data,
      data: convertTicket(response.data, params.pathParams?.collection_id as string | null)
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/tasks`;

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
