/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TagResponse, TagsResponse } from './tag.interface';
import { convertTag, tagMapping } from './tag.utils';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(url: string, headers: AxiosHeaders, params: Params): Promise<TagsResponse> {
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

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.map((data: any) => convertTag(data)),
      raw: response.data,
      meta: {
        previous: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async createTag(url: string, headers: AxiosHeaders, params: Params): Promise<TagResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return { data: convertTag(response.data), raw: response.data };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels`;
    switch (method) {
      case 'GET':
        return this.getTags(url, headers, params);

      case 'POST':
        return this.createTag(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
