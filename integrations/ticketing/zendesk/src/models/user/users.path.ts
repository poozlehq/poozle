/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getMetaParams } from 'common';

import { GetUsersParams, UsersResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(
    url: string,
    headers: AxiosHeaders,
    params: GetUsersParams,
  ): Promise<UsersResponse> {
    const final_params = {
      per_page: params.queryParams.limit,
      ...(params.queryParams.cursor || params.queryParams.created_after
        ? {
            start_time: params.queryParams.cursor
              ? params.queryParams.cursor
              : params.queryParams.created_after,
          }
        : {}),
    };
    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.users.map((data: any) => convertUser(data)),
      meta: getMetaParams(response.data, ''),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: GetUsersParams, config: Config) {
    const BASE_URL = getBaseUrl(config);
    switch (method) {
      case 'GET':
        const url = `${BASE_URL}/incremental/users`;
        return this.getUsers(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
