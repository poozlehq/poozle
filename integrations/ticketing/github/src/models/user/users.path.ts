/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { GetUsersParams, UsersResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(
    headers: AxiosHeaders,
    params: GetUsersParams,
    config: Config,
  ): Promise<UsersResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

    const final_params = {
      per_page: params.queryParams?.limit,
      page,
    };

    const response = await axios({
      url: `${BASE_URL}/repos/${config.org}/${params.queryParams?.collection_id}/assignees`,
      headers,
      params: final_params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.map((data: any) => convertUser(data)),
      meta: getMetaParams(response.data, params.queryParams?.limit, page),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: GetUsersParams, config: Config) {
    switch (method) {
      case 'GET':
        return this.getUsers(headers, params, config);

      default:
        throw new Error('Method not found');
    }
  }
}
