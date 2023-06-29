/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, UserSchema } from '@poozle/engine-edk';

import { UserPath } from './user.path';
import { UsersPath } from './users.path';

export class JiraUserModel extends BaseModel {
  constructor() {
    super('JiraUserModel', UserSchema);
  }

  paths() {
    return [
      new UsersPath(/^\/?users$/g, 'GET', this.schema),
      new UserPath(/^\/?users+/g, 'GET', this.schema),
    ];
  }
}
