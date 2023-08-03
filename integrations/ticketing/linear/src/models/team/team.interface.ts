/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Team } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TeamWithRaw extends Team {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface TeamsResponse {
  data: Team[];
  meta: Meta;
}

export interface TeamParams {
  pathParams: {
    team_id: string;
  };
}

export interface TeamResponse {
  data: Team;
}

export interface GetTeamsParams {
  queryParams: {
    limit: number;
    cursor: string;
  };
}

export interface UpdateTeamInput {
  name: string;
  description: string;
}

export interface UpdateTeamParams {
  requestBody: UpdateTeamInput;

  pathParams: {
    team_id: number;
  };
}

export interface UpdateTeamResponse {
  status: string;
  lastSyncId: number;
}
