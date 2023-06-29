/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertUser } from './user.utils';
const BASE_URL = 'https://api.github.com';

export class UserPath extends BasePath {
  async fetchSingleUser(headers: AxiosHeaders, params: Params) {
    try {
      const response = await axios({
        url: `${BASE_URL}/${params.pathParams?.user_id}`,
        headers,
      });

      return convertUser(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _config: Config,
  ) {
    switch (method) {
      case 'GET':
        return this.fetchSingleUser(headers, params);

      default:
        return {};
    }
  }
}
