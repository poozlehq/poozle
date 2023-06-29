/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Tag, PathResponse, convertToRequestBody } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTag, tagMapping } from './tag.utils';

const BASE_URL = 'https://api.github.com';

export class GetTagPath extends BasePath<Tag>  {

  async getTag(url: string, headers: AxiosHeaders, _params: Params ):Promise<PathResponse<Tag>>{
    const response = await axios({
      url,
      headers,
    });

    return response.data.map((data: any) => convertTag(data))
  }

  async updateTag(url: string, headers: AxiosHeaders, params: Params ):Promise<PathResponse<Tag>>{
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return convertTag(response.data)
    
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<PathResponse<Tag>> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels/${params.pathParams?.label_name}`;
    switch (method) {
      case 'GET':
        return this.getTag(url, headers, params);

      case 'PATCH':
        return this.updateTag(url, headers, params); 

      default:
        return {};
    }
  }
}
