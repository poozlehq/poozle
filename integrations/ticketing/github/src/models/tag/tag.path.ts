/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetTagParams, TagResponse, UpdateTagParams } from './tag.interface';
import { convertTag, tagMapping } from './tag.utils';

export class TagPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTag(url: string, headers: AxiosHeaders, _params: GetTagParams): Promise<TagResponse> {
    const response = await axios({
      url,
      headers,
    });

    return { data: convertTag(response.data) };
  }

  async updateTag(url: string, headers: AxiosHeaders, params: Params): Promise<TagResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.patch(url, createBody, { headers });

    return { data: convertTag(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTagParams | UpdateTagParams,
    config: Config,
  ) {
    const url = `${BASE_URL}/repos/${config.org}/${params.queryParams?.collection_id}/labels/${params.pathParams?.tag_name}`;
    switch (method) {
      case 'GET':
        return this.getTag(url, headers, params as GetTagParams);

      case 'PATCH':
        return this.updateTag(url, headers, params as UpdateTagParams);

      default:
        throw new Error('Method not found');
    }
  }
}
