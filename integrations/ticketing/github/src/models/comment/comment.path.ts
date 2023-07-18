/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CommentResponse } from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentPath extends BasePath {
  async fetchSingleComment(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: Params,
  ): Promise<CommentResponse> {
    const response = await axios({
      url,
      headers,
    });

    return { data: convertComment(response.data), raw: response.data };
  }

  async patchComment(url: string, headers: AxiosHeaders, params: Params): Promise<CommentResponse> {
    const response = await axios.patch(url, params.requestBody, { headers });

    return { data: convertComment(response.data), raw: response.data };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments/${params.pathParams?.comment_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleComment(url, headers, params);

      case 'PATCH':
        await this.patchComment(url, headers, params);
        return this.fetchSingleComment(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
