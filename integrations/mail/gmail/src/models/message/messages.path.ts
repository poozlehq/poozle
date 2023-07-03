/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  Meta,
  Params,
  Ticket,
} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertMessage, messageResponse } from './message.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';


export class GetMessagesPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';
    const final_params = {
      maxResults: params.queryParams?.limit,
      ...(page && { nextPageToken: page }),
    };
    const messagesResponse = await axios({
      url,
      headers,
      params: final_params,
    });

    return Promise.all(messagesResponse.data.messages.map(async (data: messageResponse) => {
      const messageUrl: string = `${BASE_URL}/${data.id}` as string
      const response = await axios(messageUrl, {headers})
      return convertMessage(response.data)
    }))
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

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {

    switch (method) {
      case 'GET':
        return this.fetchData(BASE_URL, headers, params);

      default:
        return [];
    }
  }
}
