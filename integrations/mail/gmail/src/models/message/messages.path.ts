/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Message, Meta, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { constructRawEmail, convertMessage, messageResponse } from './message.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';
let next_cursor = '';

export class GetMessagesPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
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
        ? [`before:${params.queryParams?.received_before}`]
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
    const messagesResponse = await axios({
      url,
      headers,
      params: final_params,
    });

    next_cursor = messagesResponse.data.nextPageToken;

    return Promise.all(
      messagesResponse.data.messages.map(async (data: messageResponse) => {
        const messageUrl: string = `${BASE_URL}/${data.id}` as string;
        const response = await axios(messageUrl, { headers });
        return convertMessage(response.data);
      }),
    );
  }

  async getMetaParams(_data: Message[], params: Params): Promise<Meta> {
    const page = typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: '',
        current: page,
        next: next_cursor,
      },
    };
  }

  async sendEmail(url: string, headers: AxiosHeaders, params: Params) {
    const body = {
      raw: constructRawEmail(params.requestBody),
      ...(params.requestBody?.thread_id ? { threadId: params.requestBody?.thread_id } : {}),
    };

    const createResponse = await axios.post(url, body, { headers });

    if (createResponse.status === 200) {
      const response = await axios.get(`${BASE_URL}/${createResponse.data.id}`, { headers });
      return convertMessage(response.data);
    }

    return { status: 'Failed to send request' };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchData(BASE_URL, headers, params);

      case 'POST':
        const url = `${BASE_URL}/send`;
        return this.sendEmail(url, headers, params);

      default:
        return [];
    }
  }
}
