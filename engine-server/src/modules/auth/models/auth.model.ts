/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ObjectType } from '@nestjs/graphql';

import { User } from '@generated/user/user.model';

import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
