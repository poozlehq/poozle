/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { UserConnection } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(headers: AxiosHeaders, _params: Params, _config: Config): Promise<UserConnection> {
    const response = await axios({
      url: `${BASE_URL}`,
      headers,
      data: {
        query: `
          query Users {
            users {
              nodes {
                name
                email
                url
                createdAt
              }
            } 
          }
        `,
      },
    });
    const usersList: object[] = response.data.data.users.nodes;
    return { data: usersList.map(convertUser) };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'POST':
        return this.getUsers(headers, params, config);

      default:
        throw new Error('Method not found');
    }
  }
}
