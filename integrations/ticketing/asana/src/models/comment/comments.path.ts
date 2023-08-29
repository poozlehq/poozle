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
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async createComment(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<CommentResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    let url = '';
    switch (method) {
      case 'GET' && params.pathParams?.ticket_id:
        url = `---------- URL -----------`;
        return this.fetchData(url, headers, params);

      case 'POST':
        url = `---------- URL -----------`;
        return this.createComment(url, headers, params);

      default:
        throw new Error("Unknown method")
    }
  }
}
