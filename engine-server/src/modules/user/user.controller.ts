/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionContainer } from 'supertokens-node/recipe/session';

import { User } from '@@generated/user/entities';

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
  @UseGuards(new AuthGuard())
  async getUser(@Session() session: SessionContainer): Promise<User> {
    const userId = session.getUserId();
    const user = await this.userService.getUser(userId);

    return user;
  }
}
