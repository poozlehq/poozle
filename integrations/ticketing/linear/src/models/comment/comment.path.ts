/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CommentResponse } from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentPath extends BasePath {
  async fetchSingleComment(
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _params: Params,
  ): Promise<CommentResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async patchComment(headers: AxiosHeaders, params: Params): Promise<CommentResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {

    switch (method) {
      case 'GET':
        return this.fetchSingleComment(headers, params);

      case 'PATCH':
        await this.patchComment( headers, params);
        return this.fetchSingleComment( headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
