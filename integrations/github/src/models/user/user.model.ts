import { BaseModel, UserSchema } from '@poozle/engine-edk';
import { GetUsersPath } from './get_users.path';

export class GithubUserModel extends BaseModel {
  constructor() {
    super('GithubUserModel', UserSchema);
  }

  paths() {
    return [new GetUsersPath(/^\/?users$/g, 'GET', this.schema)];
  }
}
