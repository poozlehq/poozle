import axios, { AxiosHeaders } from 'axios';
import { BaseModel } from 'bases/base_model';
import { BasePath } from 'bases/base_path';
import { Params } from 'types/integration';

export class GenericProxyModel extends BaseModel {
  constructor() {
    super('GenericProxyModel');
  }

  paths() {
    return [new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE'])];
  }
}

export class ProxyPath extends BasePath {
  async run(method: string, headers: AxiosHeaders, params: Params): Promise<any> {
    const axiosObject: any = {
      url: params.url,
      method: method,
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
