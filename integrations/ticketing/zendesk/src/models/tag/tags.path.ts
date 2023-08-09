/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getPageMeta } from 'common';

import { GetTeamsParams, TagsResponse } from './tag.interface';
import { convertTag } from './tag.utils';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(url: string, headers: AxiosHeaders, params: GetTeamsParams): Promise<TagsResponse> {
    const page = params.queryParams.cursor ? parseInt(params.queryParams.cursor.toString()) : 1;

    const final_params = {
      per_page: params.queryParams?.limit ?? 10,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.tags.map((tag: any) => convertTag(tag)),
      meta: getPageMeta(response.data, page.toString()),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: GetTeamsParams, config: Config) {
    const BASE_URL = getBaseUrl(config);
    const url = `${BASE_URL}/tags`;
    switch (method) {
      case 'GET':
        return this.getTags(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
