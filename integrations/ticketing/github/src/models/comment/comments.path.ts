/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CommentResponse, CommentsResponse } from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: Params,
  ): Promise<CommentsResponse> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;
    const final_params = {
      per_page: params.queryParams?.limit,
      since: params.queryParams?.since,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseData: any[] = [];

    if (Array.isArray(response.data)) {
      responseData = response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      responseData = [response.data];
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: responseData.map((data: any) => convertComment(data)),
      raw: response.data,
      meta: {
        previous: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async createComment(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<CommentResponse> {
    const response = await axios.post(url, params.requestBody, { headers });

    return { data: convertComment(response.data), raw: response.data };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    let url = '';
    switch (method) {
      case 'GET' && params.pathParams?.ticket_id:
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
        return this.fetchData(url, headers, params);

      case 'POST':
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
        return this.createComment(url, headers, params);

      default:
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments`;
        return this.fetchData(url, headers, params);
    }
  }
}
