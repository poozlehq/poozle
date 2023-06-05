/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { SessionContainer } from 'supertokens-node/recipe/session';

import { AuthGuard } from 'modules/auth/auth.guard';
import { Session } from 'modules/auth/session.decorator';

import { CreateUserInput } from './user.interface';
import { UserService } from './user.service';

@Controller({
  version: '1',
  path: 'user',
})
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(new AuthGuard())
  async createUser(
    @Session() session: SessionContainer,
    @Body() userData: CreateUserInput,
  ): Promise<User> {
    const userId = session.getUserId();

    return await this.userService.createUser(userId, userData);
  }

  @Get()
  async getUser() {
    return { succes: true };
  }
}
