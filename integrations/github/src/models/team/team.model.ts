import { BaseModel, TeamSchema } from '@poozle/engine-edk';
import { GetTeamsPath } from './get_team.path';
import { PostTeamsPath } from './post_team.path';
import { PutTeamsPath } from './put_team.path';

export class GithubTeamModel extends BaseModel {
  constructor() {
    super('GithubTeamModel', TeamSchema);
  }

  paths() {
    return [
      new GetTeamsPath(/^\/?teams$/g, 'GET', this.schema),
      new PostTeamsPath(/^\/?teams$/g, 'POST', this.schema),
      new PutTeamsPath(/^\/?teams$/g, 'PUT', this.schema),
    ];
  }
}
