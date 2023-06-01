/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService],
})
export class UserModule {}
