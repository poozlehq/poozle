/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, UpdateCommentBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';

import { CommentResponse, GetCommentParams, UpdateCommentParams } from './comment.interface';
import { convertComments } from './comments.utils';

export class CommentPath extends BasePath {
  async fetchSingleComment(
    url: string,
    headers: AxiosHeaders,
    params: GetCommentParams,
  ): Promise<CommentResponse> {
    const response = await axios({
      url,
      headers,
    });

    return { data: convertComments(response.data, params.pathParams.ticket_id) };
  }

  async updateComment(
    url: string,
    headers: AxiosHeaders,
    params: UpdateCommentParams,
  ): Promise<CommentResponse> {
    const updateBody: UpdateCommentBody = params.requestBody as UpdateCommentBody;
    const response = await axios.put(url, updateBody, { headers });

    return { data: convertComments(response.data, params.pathParams?.ticket_id) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetCommentParams | UpdateCommentParams,
    config: Config,
  ) {
    const baseURL = await getBaseUrl(config, headers);

    const url = `${baseURL}/issue/${params.pathParams.ticket_id}/comment/${params.pathParams.comment_id}`;
    switch (method) {
      case 'GET':
        return this.fetchSingleComment(url, headers, params);

      case 'PATCH':
        return this.updateComment(url, headers, params as UpdateCommentParams);

      default:
        throw new Error('Method not found');
    }
  }
}
