/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { TeamWithRaw } from './team.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTeam(data: any): TeamWithRaw {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
    members: [],
    raw: data,
  };
}

export const teamMapping = {
  name: 'name',
  description: 'description',
  members: 'maintainers',
};
