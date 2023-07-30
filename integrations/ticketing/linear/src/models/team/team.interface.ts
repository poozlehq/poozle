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

export interface TeamParams {
  pathParams: {
    team_id: string;
  };
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
