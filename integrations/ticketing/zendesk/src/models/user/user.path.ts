/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetUserParams, UserResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(
    url: string,
    headers: AxiosHeaders,
    _params: GetUserParams,
  ): Promise<UserResponse> {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertUser(response.data.user),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: GetUserParams, _config: Config) {
    switch (method) {
      case 'GET':
        const url = `${BASE_URL}/users/${params.pathParams.user_id}`;
        return this.fetchSingleUser(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
