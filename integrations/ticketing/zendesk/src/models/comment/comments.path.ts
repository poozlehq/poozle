/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getPageMeta } from 'common';

import { CommentsResponse, CreateCommentsParams, GetCommentsParams } from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCommentsParams,
  ): Promise<CommentsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor.toString()) : 1;

    const final_params = {
      per_page: params.queryParams?.limit ?? 10,
      page,
    };
    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.comments?.map((comment: any) =>
        convertComment(comment, params.queryParams.ticket_id),
      ),
      meta: getPageMeta(response.data, page.toString()),
    };
  }

  async createComment(
    url: string,
    headers: AxiosHeaders,
    params: CreateCommentsParams,
  ): Promise<CommentsResponse> {
    const response = await axios.put(url, { comments: params.requestBody }, { headers });

    return response.data.events.map((comment: any) =>
      convertComment(comment, params.queryParams.ticket_id),
    );
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetCommentsParams | CreateCommentsParams,
    config: Config,
  ) {
    const BASE_URL = getBaseUrl(config);
    let url = `${BASE_URL}/tickets/${params.queryParams.ticket_id}/comments`;
    switch (method) {
      case 'GET':
        return this.fetchData(url, headers, params as GetCommentsParams);

      case 'POST':
        url = `${BASE_URL}/tickets/${params.queryParams.ticket_id}`;
        return this.createComment(url, headers, params as CreateCommentsParams);

      default:
        throw new Error('Unknown method');
    }
  }
}
