/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { TeamsResponse, GetTeamsParams } from './team.interface';
import { convertTeam } from './team.utils';

export class TeamsPath extends BasePath {
  async getTeams(
    headers: AxiosHeaders,
    params: GetTeamsParams,
    _config: Config,
  ): Promise<TeamsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;
    const response = await axios({
      url: `${BASE_URL}`,
      headers,
      data: {
        query: `
            query Teams {
              teams {
                nodes {
                  id
                  name
                }
              }
            }
          `,
      },
    });
    const teamsList: object[] = response.data.data.users.nodes;
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: teamsList.map(convertTeam),
      meta: getMetaParams(response.data, params.queryParams?.limit, page),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getTeams(headers, params as GetTeamsParams, config);

      default:
        throw new Error('Method not found');
    }
  }
}
