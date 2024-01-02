/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';

import { FetchTicketTypesParams } from './ticket_types.interface';
import { convertTicketType } from './ticket_types.utils';

export class TicketTypesPath extends BasePath {
  async fetchTicketTypes(url: string, headers: AxiosHeaders) {
    const response = await axios({
      url: `${url}`,
      headers,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response?.data?.issueTypes?.map((data: any) => convertTicketType(data)) || [],
    };
  }

  async run(method: string, headers: AxiosHeaders, params: FetchTicketTypesParams, config: Config) {
    let url = '';
    const baseURL = await getBaseUrl(config, headers);

    switch (method) {
      case 'GET':
        url = `${baseURL}/project/${params.pathParams.collection_id}`;
        return this.fetchTicketTypes(url, headers);

      default:
        throw new Error('Method not found');
    }
  }
}
