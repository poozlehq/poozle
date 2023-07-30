/* eslint-disable import/order */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, CreateCommentBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertComments } from './comments.utils';
import { getBaseUrl, getMetaParams } from 'common';
import {
  CommentResponse,
  CommentsResponse,
  CreateCommentParams,
  GetCommentsParams,
} from './comment.interface';

export class CommentsPath extends BasePath {
  async fetchComments(
    url: string,
    headers: AxiosHeaders,
    { queryParams, pathParams }: GetCommentsParams,
  ): Promise<CommentsResponse> {
    const page = typeof queryParams?.cursor === 'string' ? parseInt(queryParams?.cursor) : 1;

    const response = await axios({
      url,
      headers,
      params: {
        maxResults: queryParams.limit,
        startAt: page,
      },
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.comments.map((data: any) =>
        convertComments(data, pathParams.ticket_id as string | null),
      ),
      meta: getMetaParams(response.data, queryParams.limit, page),
    };
  }

  async createComment(
    url: string,
    headers: AxiosHeaders,
    params: CreateCommentParams,
  ): Promise<CommentResponse> {
    const createBody: CreateCommentBody = params.requestBody as CreateCommentBody;

    const response = await axios.post(url, createBody, { headers });

    return { data: convertComments(response.data, params.pathParams?.ticket_id) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetCommentsParams | CreateCommentParams,
    config: Config,
  ) {
    const baseURL = await getBaseUrl(config, headers);

    const url = `${baseURL}/issue/${params.pathParams?.ticket_id}/comment`;
    switch (method) {
      case 'GET':
        return this.fetchComments(url, headers, params as GetCommentsParams);

      case 'POST':
        return this.createComment(url, headers, params as CreateCommentParams);

      default:
        throw new Error('Method not found');
    }
  }
}
