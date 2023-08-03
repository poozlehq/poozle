/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TagResponse, TagsResponse } from './tag.interface';
import { convertTag, tagMapping } from './tag.utils';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(headers: AxiosHeaders, params: Params): Promise<TagsResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async createTag(headers: AxiosHeaders, params: Params): Promise<TagResponse> {
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getTags(headers, params);

      case 'POST':
        return this.createTag(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
