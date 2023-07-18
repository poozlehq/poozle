/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Team } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TeamsResponse {
  data: Team[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface TeamResponse {
  data: Team;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
