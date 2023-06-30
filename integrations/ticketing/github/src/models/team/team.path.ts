/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertTag } from 'models/tag/tag.utils';

import { convertTeam, teamMapping } from './team.utils';

const BASE_URL = 'https://api.github.com';

export class TeamPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTeam(url: string, headers: AxiosHeaders, _params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return convertTeam(response.data);
  }

  async updateTeam(url: string, headers: AxiosHeaders, params: Params) {
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, teamMapping);

    const response = await axios.post(url, createBody, { headers });
    return convertTag(response.data);
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/orgs/${config.org}/teams/${params.pathParams?.team_name}`;
    switch (method) {
      case 'GET':
        return this.getTeam(url, headers, params);

      case 'PATCH':
        return this.updateTeam(url, headers, params);

      default:
        return [];
    }
  }
}
