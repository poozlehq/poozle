/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToRequestBody } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TeamResponse, TeamsResponse } from './team.interface';
import { convertTeam, teamMapping } from './team.utils';

export class TeamsPath extends BasePath {
  async getTeams(url: string, headers: AxiosHeaders, params: Params): Promise<TeamsResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async createTeams(url: string, headers: AxiosHeaders, params: Params): Promise<TeamResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `--------------- URL ------------------`;
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
