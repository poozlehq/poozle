/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { ThreadResponse, ThreadsResponse } from './thread.interface';
import { convertThread } from './thread.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/threads';

export class ThreadsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getThreads(url: string, headers: AxiosHeaders, params: Params): Promise<ThreadsResponse> {
    const page = typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';
    const q = [
      ...(params.queryParams?.subject ? [`subject:${params.queryParams?.subject}`] : []),
      ...(params.queryParams?.from ? [`from:${params.queryParams?.from}`] : []),
      ...(params.queryParams?.to ? [`to:${params.queryParams?.to}`] : []),
      ...(params.queryParams?.cc ? [`cc:${params.queryParams?.cc}`] : []),
      ...(params.queryParams?.bcc ? [`bcc:${params.queryParams?.bcc}`] : []),
      ...(params.queryParams?.starred ? [`is:starred`] : []),
      ...(params.queryParams?.unread ? [`is:unread`] : []),
      ...(params.queryParams?.received_after
        ? [`after:${params.queryParams?.received_after}`]
        : []),
      ...(params.queryParams?.received_before
        ? [`after:${params.queryParams?.received_before}`]
        : []),
    ];
    const final_params = {
      maxResults: params.queryParams?.limit,
      ...(page && { pageToken: page }),
      ...(params.queryParams?.labels && { labels: params.queryParams?.labels }),
      ...(params.queryParams?.direction && {
        orderBy: params.queryParams?.direction === 'asc' ? 'oldest' : 'newest',
      }),
      ...(q && { q: q.join(' ') }),
    };

    const threadResponse = await axios({
      url,
      headers,
      params: final_params,
    });

    const next_cursor = threadResponse.data.nextPageToken;

    const response = await Promise.all(
      threadResponse.data.threads.map(async (data: ThreadResponse) => {
        const threadUrl: string = `${BASE_URL}/${data.id}` as string;
        return (await axios(threadUrl, { headers })).data;
      }),
    );

    return {
      data: response.map((thread) => convertThread(thread)),
      raw: response,
      meta: {
        previous: '',
        current: page,
        next: next_cursor,
      },
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.getThreads(BASE_URL, headers, params);

      default:
        throw new Error(`Unknown method ${method}`);
    }
  }
}
