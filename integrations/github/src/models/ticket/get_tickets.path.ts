/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Meta, Params, PathResponse, Ticket } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTicket } from './ticket.utils';

const BASE_URL = 'https://api.github.com';

export class GetTicketsPath extends BasePath<Ticket> {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<PathResponse<Ticket>[]> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const response = await axios({
      url,
      headers,
      params: {
        per_page: params.queryParams?.limit,
        page,
      },
    });

    const responseData = response.data;

    return responseData.map((data: any) =>
      convertTicket(data, params.pathParams?.collection_id as string | null),
    );
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

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Ticket>[]> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues`;
    return this.fetchData(url, headers, params);
  }
}
