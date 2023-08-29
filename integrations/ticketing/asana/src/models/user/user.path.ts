/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {BasePath, Config, Params} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import {UserParams, UserResponse} from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(headers: AxiosHeaders, params: UserParams): Promise<UserResponse> {
    try {
      const url = BASE_URL + `/users/${params.pathParams.user_gid}`;
      const response = await axios.get(url,{headers});
      return {
        data: convertUser(response.data.data),
        raw: response.data.data,
      };
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
        return this.fetchSingleUser(headers, params as UserParams);

      default:
        throw new Error('Method not found');
    }
  }
}
