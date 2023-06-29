/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertUser } from './user.utils';

const BASE_URL = 'https://api.github.com';

export class GetUsersPath extends BasePath {
  async getUsers(headers: AxiosHeaders, params: Params, config: Config) {
    try {
      const response = await axios({
        url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/assignees`,
        headers,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.data.map((data: any) => convertUser(data));
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getUsers(headers, params, config);

      default:
        return [];
    }
  }
}
