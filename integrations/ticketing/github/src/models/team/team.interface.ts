/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTeamBody, Team, UpdateTeamBody } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TeamWithRaw extends Team {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface TeamsResponse {
  data: TeamWithRaw[];
  meta: Meta;
}

export interface TeamResponse {
  data: TeamWithRaw;
}

export interface GetTeamsParams {
  queryParams: {
    limit: number;
    cursor: string;
  };
}

export interface GetTeamParams {
  pathParams: {
    team_name: string;
  };
}

export interface CreateTeamParams {
  requestBody: CreateTeamBody;
}

export interface UpdateTeamParams {
  requestBody: UpdateTeamBody;

  pathParams: {
    team_name: string;
  };
}
