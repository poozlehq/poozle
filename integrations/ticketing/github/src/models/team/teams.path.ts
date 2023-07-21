/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { CreateTeamParams, GetTeamsParams, TeamResponse, TeamsResponse } from './team.interface';
import { convertTeam, teamMapping } from './team.utils';

export class TeamsPath extends BasePath {
  async getTeams(
    url: string,
    headers: AxiosHeaders,
    params: GetTeamsParams,
  ): Promise<TeamsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

    const final_params = {
      per_page: params.queryParams?.limit,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.map((data: any) => convertTeam(data)),
      meta: getMetaParams(response.data, params.queryParams?.limit, page),
    };
  }

  async createTeams(
    url: string,
    headers: AxiosHeaders,
    params: CreateTeamParams,
  ): Promise<TeamResponse> {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, teamMapping);

    const response = await axios.post(url, createBody, { headers });

    return { data: convertTeam(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetTeamsParams | CreateTeamParams,
    config: Config,
  ) {
    const url = `${BASE_URL}/orgs/${config.org}/teams`;
    switch (method) {
      case 'GET':
        return this.getTeams(url, headers, params as GetTeamsParams);

      case 'POST':
        return this.createTeams(url, headers, params as CreateTeamParams);

      default:
        throw new Error('Method not found');
    }
  }
}
