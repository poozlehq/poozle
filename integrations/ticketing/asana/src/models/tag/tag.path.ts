/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TagResponse } from './tag.interface';
import { convertTag, tagMapping } from './tag.utils';

export class TagPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTag(url: string, headers: AxiosHeaders, _params: Params): Promise<TagResponse> {
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async updateTag(url: string, headers: AxiosHeaders, params: Params): Promise<TagResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `--------- URL -------------`;
    switch (method) {
      case 'GET':
        return this.getTag(url, headers, params);

      case 'PATCH':
        return this.updateTag(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
