/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Comment, Config, convertToRequestBody, Params, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { commentMappings, convertComment } from './comment.utils';

const BASE_URL = 'https://api.github.com';

export class GetCommentPath extends BasePath<Comment> {
  async fetchSingleComment(
    url: string,
    headers: AxiosHeaders,
    _params: Params,
  ): Promise<PathResponse<Comment>> {
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

  async patchComment(url: string,
    headers: AxiosHeaders,
    params: Params,): Promise<PathResponse<Comment>> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, commentMappings);
    const response = await axios.post(url, createBody, { headers });

    return convertComment(response.data)

  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Comment>> {
    
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments/${params.pathParams?.comment_id}`

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
