/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetTeamParams, TeamResponse } from './team.interface';
import { convertTeam } from './team.utils';

export class TeamPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTeam(url: string, headers: AxiosHeaders, _params: Params): Promise<TeamResponse> {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertTeam(response.data.group),
    };
  }

  async updateTeam(url: string, headers: AxiosHeaders, params: Params): Promise<TeamResponse> {
    const response = await axios.put(url, { group: params.requestBody }, { headers });

    return { data: convertTeam(response.data.group) };
  }

  async run(method: string, headers: AxiosHeaders, params: GetTeamParams, _config: Config) {
    const url = `${BASE_URL}/groups/${params.pathParams.team_id}`;
    switch (method) {
      case 'GET':
        return this.getTeam(url, headers, params);

      case 'PATCH':
        return this.updateTeam(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
