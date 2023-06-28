/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, PathResponse, Ticket } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTicket } from './ticket.utils';

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

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Ticket>> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}`;
    return this.fetchSingleTicket(url, headers, params);
  }
}
