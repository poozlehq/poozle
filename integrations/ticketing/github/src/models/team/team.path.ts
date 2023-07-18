/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TeamResponse } from './team.interface';
import { convertTeam, teamMapping } from './team.utils';

export class TeamPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTeam(url: string, headers: AxiosHeaders, _params: Params): Promise<TeamResponse> {
    const response = await axios({
      url,
      headers,
    });

    return { data: convertTeam(response.data), raw: response.data };
  }

  async updateTeam(url: string, headers: AxiosHeaders, params: Params): Promise<TeamResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, teamMapping);
    const response = await axios.patch(url, createBody, { headers });

    return { data: convertTeam(response.data), raw: response.data };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/orgs/${config.org}/teams/${params.pathParams?.team_name}`;
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
