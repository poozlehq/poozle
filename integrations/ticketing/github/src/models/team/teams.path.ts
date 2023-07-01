/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody, Team, Meta } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertTag } from 'models/tag/tag.utils';

import { convertTeam, teamMapping } from './team.utils';

const BASE_URL = 'https://api.github.com';

export class TeamsPath extends BasePath {
  async getTeams(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const final_params = {
      per_page: params.queryParams?.limit,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });
    return response.data.map((data: any) => convertTeam(data));
  }

  async getMetaParams(_data: Team[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async createTeams(url: string, headers: AxiosHeaders, params: Params) {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, teamMapping);

    const response = await axios.post(url, createBody, { headers });
    return convertTag(response.data);
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/orgs/${config.org}/teams`;
    switch (method) {
      case 'GET':
        return this.getTeams(url, headers, params);

      case 'POST':
        return this.createTeams(url, headers, params);

      default:
        return [];
    }
  }
}
