/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TeamParams, TeamResponse, UpdateTeamParams, UpdateTeamResponse } from './team.interface';
import { convertTeam, convertUpdateTeam } from './team.utils';

export class TeamPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTeam(headers: AxiosHeaders, params: TeamParams): Promise<TeamResponse> {
    try {
      const id = params.pathParams.team_id;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query Team($teamId: String!) {
              team(id: $teamId) {
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
          variables: {
            id,
          },
        },
      });
      return { data: convertTeam(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTeam(headers: AxiosHeaders, params: UpdateTeamParams): Promise<UpdateTeamResponse> {
    try {
      const id = params.pathParams.team_id;
      const input = params.requestBody;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            mutation TeamUpdate($input: TeamUpdateInput!, $teamUpdateId: String!) {
              teamUpdate(input: $input, id: $teamUpdateId) {
                success
                lastSyncId
              }
            }
          `,
          variables: {
            input,
            teamUpdateId: id,
          },
        },
      });
      return convertUpdateTeam(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.getTeam(headers, params as TeamParams);

      case 'PATCH':
        await this.updateTeam(headers, params as UpdateTeamParams);
        return this.getTeam(headers, params as TeamParams);

      default:
        throw new Error('Method not found');
    }
  }
}
