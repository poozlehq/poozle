/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { TeamWithRaw } from './team.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTeam(data: any): TeamWithRaw {
  return {
    id: data.id.toString(),
    name: data.name,
    description: data.description,
    members: [],

    // Raw
    raw: data,
  };
}

export const teamMapping = {
  name: 'name',
  description: 'description',
  members: 'maintainers',
};
