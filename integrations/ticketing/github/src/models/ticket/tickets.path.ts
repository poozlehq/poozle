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
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const final_params = {
      per_page: params.queryParams?.limit,
      sort:
        params.queryParams?.sort === 'created_at'
          ? 'created'
          : params.queryParams?.sort === 'updated_at'
          ? 'updated'
          : '',
      direction: params.queryParams?.direction,
      since: params.queryParams?.since,
      page,
      ...(params.queryParams?.state && { state: params.queryParams.state }),
      ...(params.queryParams?.assignee_id && { assignee: params.queryParams.assignee_id }),
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
        convertTicket(data, params.pathParams?.collection_id as string | null),
      ),
      raw: response.data,
      meta: {
        previous: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async createTicket(url: string, headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    const body: CreateTicketBody = params.requestBody as CreateTicketBody;
    const createBody = convertToRequestBody(body, ticketMappings);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createBody.assignees = createBody.assignees.map((assignee: any) => assignee.id);

    const response = await axios.post(url, createBody, { headers });

    return {
      data: convertTicket(response.data, params.pathParams?.collection_id as string | null),
      raw: response.data,
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues`;

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
