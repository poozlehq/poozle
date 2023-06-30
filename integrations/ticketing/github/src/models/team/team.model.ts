/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TeamSchema } from '@poozle/engine-edk';

import { GetTeamsPath } from './teams';
import { GetTeamPath } from './team';


export class GithubTeamModel extends BaseModel {
  constructor() {
    super('GithubTeamModel', TeamSchema);
  }

  paths() {
    return [
      new GetTeamsPath(/^\/?teams$/g, ['GET', 'POST'], this.schema),
      new GetTeamPath(/^\/?teams+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
