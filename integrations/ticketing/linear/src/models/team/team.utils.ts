/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Team } from '@poozle/engine-idk';

import { UpdateTeamResponse } from './team.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTeam(data: any): Team {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    members: [],
  };
}

export function convertUpdateTeam(data: any): UpdateTeamResponse {
  return {
    status: data.success,
    lastSyncId: data.lastSyncId,
  };
}

export const teamMapping = {
  name: 'name',
  description: 'description',
  members: 'maintainers',
};
