/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import {BASE_URL, getMetaParams} from 'common';

import { UsersResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(headers: AxiosHeaders, params: Params, _config: Config): Promise<UsersResponse> {
    try {
      const page = params.pathParams?.workspace && params.queryParams?.limit ? parseInt(<string>params.queryParams?.limit) : 1;
      const url = BASE_URL + `/users`;
      const response = await axios.get(url,{headers});
      return {
        data: response.data.map((data: any) => convertUser(data)),
        meta: getMetaParams(response.data, params.queryParams?.limit, page),
        raw: response.data
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getUsers(headers, params, config);

      default:
        throw new Error('Method not found');
    }
  }
}
