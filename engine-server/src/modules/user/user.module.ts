/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { PasswordService } from 'modules/auth/password.service';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService, PasswordService],
})
export class UserModule {}
