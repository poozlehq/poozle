/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { UserParams, UserResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(headers: AxiosHeaders, params: UserParams): Promise<UserResponse> {
    const id = params.user_id;
    const response = await axios({
      url: `${BASE_URL}`,
      headers,
      data: {
        query: `
            query fetchSingleUser($id: String!) {
                        user(id: $id) {
                                id
                                name
                                email
                                url
                                avatarUrl
                                created
                            }
                    }
          `,
        variables: {
          id,
        },
      },
    });
    return { data: convertUser(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: UserParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _config: Config,
  ) {
    switch (method) {
      case 'POST':
        return this.fetchSingleUser(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
