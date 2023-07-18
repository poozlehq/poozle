/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { UsersResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(headers: AxiosHeaders, params: Params, config: Config): Promise<UsersResponse> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;
    const final_params = {
      per_page: params.queryParams?.limit,
      page,
    };

    const response = await axios({
      url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/assignees`,
      headers,
      params: final_params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.map((data: any) => convertUser(data)),
      raw: response.data,
      meta: {
        previous: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
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
