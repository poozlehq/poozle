import { BaseModel, UserSchema } from '@poozle/engine-edk';
import { UsersPath } from './users.path';
import { UserPath } from './user.path';

export class JiraUserModel extends BaseModel {
  constructor() {
    super('JiraUserModel', UserSchema);
  }

  paths() {
    return [
      new UsersPath(/^\/?users$/g, ['GET', 'POST'], this.schema),
      new UserPath(/^\/?users+/g, ['GET', 'PATCH'], this.schema),
    ];
  }
}
