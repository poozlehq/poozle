import { BaseModel, TeamSchema } from '@poozle/engine-edk';
import { GetTeamsPath } from './get_team.path';

export class GithubTeamModel extends BaseModel {
  constructor() {
    super('GithubTeamModel', TeamSchema);
  }

  paths() {
    return [new GetTeamsPath(/^\/?teams$/g, 'GET', this.schema)];
  }
}
