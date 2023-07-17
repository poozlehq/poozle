/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios, { AxiosHeaders } from 'axios';
import { BasePath } from 'bases/base_path';

import { Params } from 'types/integration';

export class ProxyPath extends BasePath {
  async run(method: string, headers: AxiosHeaders, params: Params): Promise<any> {
    const axiosObject: any = {
      url: params.url,
      method,
      headers: headers as any,
    };

    if (params.requestBody) {
      axiosObject['data'] = params.requestBody;
    }

    if (params.queryParams) {
      axiosObject['params'] = params.queryParams;
    }

    const response = await axios(axiosObject);

    return response.data;
  }
}
