/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  Params,
  convertToModelKeys,
  convertToRequestBody,
} from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

export class PutTagsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels/${params.pathParams?.label_name}`;
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, tagMapping);

    const response = await axios.post(url, createBody, { headers });

    return {
      data: convertToModelKeys(
        {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        },
        this.schema,
        response.data,
        params.queryParams?.raw ? true : false,
      ),
      meta: {},
    };
  }
}
