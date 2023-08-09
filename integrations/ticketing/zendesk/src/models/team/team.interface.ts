/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Team } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TeamWithRaw extends Team {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;

  created_at: string;
  updated_at: string;
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
    cursor?: string;
    created_after?: string;
  };
  pathParams: {};
}

export interface GetTeamParams {
  queryParams: {};
  pathParams: {
    organization_id: string;
    team_id: string;
  };
}
