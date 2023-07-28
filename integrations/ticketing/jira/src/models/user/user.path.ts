/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';

import { GetUserParams, UserResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(url: string, headers: AxiosHeaders): Promise<UserResponse> {
    try {
      const response = await axios({
        url,
        headers,
      });

      return { data: convertUser(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: GetUserParams, config: Config) {
    let url = '';

    switch (method) {
      case 'GET':
        url = `${getBaseUrl(config)}/user?accountId=${params.pathParams?.user_id}`;
        return this.fetchSingleUser(url, headers);

      default:
        throw new Error('Method not found');
    }
  }
}
