/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Comment, convertToRequestBody } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { commentMappings, convertComment } from './comment.utils';

const BASE_URL = 'https://api.github.com';

export class GetCommentsPath extends BasePath {
  async fetchData(
    url: string,
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: Params,
  ): Promise<Array<Partial<Comment>>> {
    const response = await axios({
      url,
      headers,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseData: any[] = [];

    if (Array.isArray(response.data)) {
      responseData = response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      responseData = [response.data];
    }

    return responseData.map((data: any) => convertComment(data));
  }

  async createComment(url: string, headers: AxiosHeaders, params: Params) {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, commentMappings);

    const response = await axios.post(url, createBody, { headers });

    return [convertComment(response.data)];
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
