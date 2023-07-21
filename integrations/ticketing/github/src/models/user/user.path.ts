/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetUserParams, UserResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(headers: AxiosHeaders, params: GetUserParams): Promise<UserResponse> {
    const response = await axios({
      url: `${BASE_URL}/users/${params.pathParams?.user_id}`,
      headers,
    });

    return { data: convertUser(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetUserParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _config: Config,
  ) {
    switch (method) {
      case 'GET':
        return this.fetchSingleUser(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
