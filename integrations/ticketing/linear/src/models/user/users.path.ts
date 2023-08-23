/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { GetUsersParams, UsersResponse } from './user.interface';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath {
  async getUsers(
    headers: AxiosHeaders,
    params: GetUsersParams,
    _config: Config,
  ): Promise<UsersResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;
      const response = await axios.post(
        BASE_URL,
        {
          query: `query Users {
              users {
                nodes {
                  id
                  createdAt
                  updatedAt
                  archivedAt
                  name
                  displayName
                  email
                  avatarUrl
                  disableReason
                  inviteHash
                  calendarHash
                  description
                  statusEmoji
                  statusLabel
                  statusUntilAt
                  timezone
                  lastSeen
                  guest
                  active
                  url
                  isMe
                  admin
                }
              } 
            }`,
        },
        {
          headers,
        },
      );
      const usersList: object[] = response.data.data.users.nodes;
      return {
        meta: getMetaParams(response.data, params.queryParams?.limit, page),
        data: usersList.map(convertUser),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getUsers(headers, params as GetUsersParams, config);

      default:
        throw new Error('Method not found');
    }
  }
}
