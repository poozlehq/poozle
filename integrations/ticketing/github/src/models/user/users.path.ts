/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Meta, Params, User } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertUser } from './user.utils';

const BASE_URL = 'https://api.github.com';

export class UsersPath extends BasePath {
  async getUsers(headers: AxiosHeaders, params: Params, config: Config) {
    try {
      const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;
      const final_params = {
        per_page: params.queryParams?.limit,
        page,
      };

      const response = await axios({
        url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/assignees`,
        headers,
        params: final_params
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.data.map((data: any) => convertUser(data));
    } catch (e) {
      throw new Error(e);
    }
  }

  async getMetaParams(_data: User[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
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
        return [];
    }
  }
}
