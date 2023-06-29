/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Meta, Params, User } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async fetchUsers(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    try {
      const response = await axios({
        url,
        headers,
        params: {
          maxResult: params.queryParams?.limit,
          startAt: page,
        },
      });

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
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/users/search`;
        return this.fetchUsers(url, headers, params);

      default:
        return [];
    }
  }
}
