/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Tag, PathResponse, convertToRequestBody } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTag, tagMapping } from './tag.utils';

const BASE_URL = 'https://api.github.com';

export class GetTagsPath extends BasePath<Tag>  {

  async getTags(url: string, headers: AxiosHeaders, _params: Params ):Promise<PathResponse<Tag>[]>{
    const response = await axios({
      url,
      headers,
    });

    return response.data.map((data: any) => convertTag(data))
  }

  async createTags(url: string, headers: AxiosHeaders, params: Params ):Promise<PathResponse<Tag>[]>{
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return [convertTag(response.data)]
    
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<PathResponse<Tag>[]> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels`
    switch (method) {
      case 'GET':
        return this.getTags(url, headers, params);

      case 'PATCH':
        return this.createTags(url, headers, params); 

      default:
        return [];
    }
  }
}
