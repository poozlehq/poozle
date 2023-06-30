/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, TeamSchema } from '@poozle/engine-edk';

import { TeamPath } from './team.path';
import { TeamsPath } from './teams.path';

export class GithubTeamModel extends BaseModel {
  constructor() {
    super('GithubTeamModel', TeamSchema);
  }

  paths() {
    return [
      new TeamsPath(/^\/?teams$/g, ['GET', 'POST'], this.schema),
      new TeamPath(/^\/?teams+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
