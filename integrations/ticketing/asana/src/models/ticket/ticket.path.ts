/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TicketResponse } from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';

export class TicketPath extends BasePath {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<TicketResponse> {
    try {
      const response = await axios({
        url,
        headers,
      });

      return {
        raw: response.data.data,
        data: convertTicket(response.data, params.pathParams?.collection_id)
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchTicket(url: string, headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/tasks/${params.pathParams?.task_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params);

      case 'PATCH':
        await this.patchTicket(url, headers, params);
        return this.fetchSingleTicket(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
