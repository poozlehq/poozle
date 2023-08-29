/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Team } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTeam(data: any): Team {
  // return {
  //   id: data.id,
  //   name: data.name,
  //   description: data.description,
  //   members: [],
  // };

  /** 
   * TODO: The above is a mapping we used in Github. But you need to
   * write mapping specific to the current integration
  */
}

export const teamMapping = {
  name: 'name',
  description: 'description',
  members: 'maintainers',
};
