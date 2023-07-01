/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody, Meta, Tag } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertTag, tagMapping } from './tag.utils';

const BASE_URL = 'https://api.github.com';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;
    const final_params = {
      per_page: params.queryParams?.limit,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((data: any) => convertTag(data));
  }

  async createTags(url: string, headers: AxiosHeaders, params: Params) {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return [convertTag(response.data)];
  }

  async getMetaParams(_data: Tag[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels`;
    switch (method) {
      case 'GET':
        return this.getTags(url, headers, params);

      case 'POST':
        return this.createTags(url, headers, params);

      default:
        return [];
    }
  }
}
