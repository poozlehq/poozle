/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetUserParams, UserResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(headers: AxiosHeaders, params: GetUserParams): Promise<UserResponse> {
    try {
      const id = params.pathParams?.user_id;
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
        return this.fetchSingleUser(headers, params as GetUserParams);

      default:
        throw new Error('Method not found');
    }
  }
}
