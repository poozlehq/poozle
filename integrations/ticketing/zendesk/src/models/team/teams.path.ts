/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getPageMeta } from 'common';

import { TeamResponse, TeamsResponse } from './team.interface';
import { convertTeam } from './team.utils';

export class TeamsPath extends BasePath {
  async getTeams(url: string, headers: AxiosHeaders, params: Params): Promise<TeamsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor.toString()) : 1;

    const final_params = {
      per_page: params.queryParams?.limit ?? 10,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.groups.map((group: any) => convertTeam(group)),
      meta: getPageMeta(response.data, page.toString()),
    };
  }

  async createTeams(url: string, headers: AxiosHeaders, params: Params): Promise<TeamResponse> {
    const response = await axios.post(url, { group: params.requestBody }, { headers });

    return { data: convertTeam(response.data.group) };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const BASE_URL = getBaseUrl(config);
    const url = `${BASE_URL}/groups`;
    switch (method) {
      case 'GET':
        return this.getTeams(url, headers, params);

      case 'POST':
        return this.createTeams(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
