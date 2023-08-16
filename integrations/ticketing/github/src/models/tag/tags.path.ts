/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { CreateTagParams, GetTagsParams, TagResponse, TagsResponse } from './tag.interface';
import { convertTag, tagMapping } from './tag.utils';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(url: string, headers: AxiosHeaders, params: GetTagsParams): Promise<TagsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

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
      meta: getMetaParams(response.data, params.queryParams?.limit, page),
    };
  }

  async createTag(
    url: string,
    headers: AxiosHeaders,
    params: CreateTagParams,
  ): Promise<TagResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return { data: convertTag(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTagsParams | CreateTagParams,
    config: Config,
  ) {
    const url = `${BASE_URL}/repos/${config.org}/${params.queryParams?.collection_id}/labels`;
    switch (method) {
      case 'GET':
        return this.getTags(url, headers, params as GetTagsParams);

      case 'POST':
        return this.createTag(url, headers, params as CreateTagParams);

      default:
        throw new Error('Method not found');
    }
  }
}
