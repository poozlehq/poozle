/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { GetTeamsParams, TeamsResponse } from './team.interface';
import { convertTeam } from './team.utils';
import { BASE_URL, getMetaParams } from '../../common';

export class TeamsPath extends BasePath {
  async getTeams(headers: AxiosHeaders, params: GetTeamsParams): Promise<TeamsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            teams {
              nodes {
                id
                name
                description
                members {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
          `,
        },
        { headers },
      );
      const teamsList: object[] = response.data.data.users.nodes;
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: teamsList.map(convertTeam),
        meta: getMetaParams(response.data, params.queryParams?.limit, page),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.getTeams(headers, params as GetTeamsParams);

      default:
        throw new Error('Method not found');
    }
  }
}
