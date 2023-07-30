/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody, Team} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TeamParams, TeamResponse } from './team.interface';
import { convertTeam, teamMapping } from './team.utils';

export class TeamPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTeam(headers: AxiosHeaders, params: TeamParams): Promise<TeamResponse> {
    const id = params.pathParams.team_id;
    const response = await axios({
      url: `${BASE_URL}`,
      headers,
      data: {
        query: `
            query ExampleQuery($teamId: String!) {
              team(id: $teamId) {
                id 
                name
              }
            }
          `,
        variables: {
          id,
        },
      },
    });
    return { data: convertTeam(response.data) };
  }

  async updateTeam(headers: AxiosHeaders, params: Params): Promise<TeamResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.getTeam(headers, params as TeamParams);

      case 'PATCH':
        return this.updateTeam(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
