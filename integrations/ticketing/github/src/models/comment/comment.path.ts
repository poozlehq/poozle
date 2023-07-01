/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Comment, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import {convertComment } from './comment.utils';

const BASE_URL = 'https://api.github.com';

export class CommentPath extends BasePath {
  async fetchSingleComment(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: Params,
  ): Promise<Partial<Comment>> {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertComment(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchComment(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<Partial<Comment>> {
    const response = await axios.patch(url, params.requestBody, { headers });

    return convertComment(response.data);
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<Partial<Comment>> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments/${params.pathParams?.comment_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleComment(url, headers, params);

      case 'PATCH':
        await this.patchComment(url, headers, params);
        return this.fetchSingleComment(url, headers, params);

      default:
        return {};
    }
  }
}
