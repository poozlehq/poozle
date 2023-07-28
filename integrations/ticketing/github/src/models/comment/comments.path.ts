/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import {
  CommentResponse,
  CommentsResponse,
  CreateCommentParams,
  GetCommentsParams,
} from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: GetCommentsParams,
  ): Promise<CommentsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

    const limit = params.queryParams?.limit ?? 10;

    const final_params = {
      per_page: params.queryParams?.limit,
      since: params.queryParams?.created_after,
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
      meta: getMetaParams(responseData, limit, page),
    };
  }

  async createComment(
    url: string,
    headers: AxiosHeaders,
    params: CreateCommentParams,
  ): Promise<CommentResponse> {
    const response = await axios.post(url, params.requestBody, { headers });

    return { data: convertComment(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetCommentsParams | CreateCommentParams,
    config: Config,
  ) {
    let url = '';
    switch (method) {
      case 'GET':
      case params.pathParams?.collection_id:
      case params.pathParams?.ticket_id:
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
        return this.fetchData(url, headers, params as GetCommentsParams);

      case 'POST':
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
        return this.createComment(url, headers, params as CreateCommentParams);

      default:
        url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments`;
        return this.fetchData(url, headers, params as GetCommentsParams);
    }
  }
}
