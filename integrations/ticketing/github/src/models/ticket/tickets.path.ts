/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  convertToRequestBody,
  CreateTicketBody,
  Meta,
  Params,
  Ticket,
} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertTicket, ticketMappings } from './ticket.utils';

const BASE_URL = 'https://api.github.com';

export class GetTicketsPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return responseData.map((data: any) =>
      convertTicket(data, params.pathParams?.collection_id as string | null),
    );
  }

  async createTicket(url: string, headers: AxiosHeaders, params: Params) {
    const body: CreateTicketBody = params.requestBody as CreateTicketBody;
    const createBody = convertToRequestBody(body, ticketMappings);
    createBody.assignees = createBody.assignees.map((assignee: any) => assignee.id);

    const response = await axios.post(url, createBody, { headers });

    return convertTicket(response.data, params.pathParams?.collection_id as string | null);
  }

  async getMetaParams(_data: Ticket[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
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
        return [];
    }
  }
}
