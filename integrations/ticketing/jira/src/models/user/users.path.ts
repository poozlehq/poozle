/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getMetaParams } from 'common';

import { GetUsersParams } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async fetchUsers(url: string, headers: AxiosHeaders, params: GetUsersParams) {
    const page = params.queryParams.cursor ? parseInt(params.queryParams.cursor) : 1;

    try {
      const response = await axios({
        url,
        headers,
        params: {
          maxResult: params.queryParams.limit,
          startAt: page,
        },
      });

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: response.data.map((data: any) => convertUser(data)),
        meta: getMetaParams(response.data, params.queryParams.limit, page),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: GetUsersParams, config: Config) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/users/search`;
        return this.fetchUsers(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
