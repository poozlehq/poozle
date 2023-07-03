/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Meta, Tag } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertThread, threadResponse } from './thread.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/threads';

export class ThreadsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getThreads(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';
    const final_params = {
      maxResults: params.queryParams?.limit,
      ...(page && { nextPageToken: page }),
    };

    const threadResponse = await axios({
      url,
      headers,
      params: final_params,
    });

    return Promise.all(threadResponse.data.threads.map(async (data: threadResponse) => {
      const messageUrl: string = `${BASE_URL}/${data.id}` as string
      const response = await axios(messageUrl, {headers})
      console.log(response.data)
      return convertThread(response.data)
    }))
    
  }

  async getMetaParams(_data: Tag[], params: Params): Promise<Meta> {
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
        return this.getThreads(BASE_URL, headers, params);

      default:
        return [];
    }
  }
}
