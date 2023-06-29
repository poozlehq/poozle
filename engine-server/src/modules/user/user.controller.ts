/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import jwt from 'supertokens-node/recipe/jwt';
import { SessionContainer } from 'supertokens-node/recipe/session';

import { User } from '@@generated/user/entities';

import { AuthGuard } from 'modules/auth/auth.guard';
import { Session } from 'modules/auth/session.decorator';

import { CreateTokenBody, CreateUserInput } from './user.interface';
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

  @Post('token')
  @UseGuards(new AuthGuard())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createJWT(
    @Body()
    createTokenBody: CreateTokenBody,
  ) {
    const jwtResponse = await jwt.createJWT(
      {
        name: createTokenBody.name,
        source: 'microservice',
      },
      createTokenBody.seconds,
    );
    if (jwtResponse.status === 'OK') {
      // Send JWT as Authorization header to M2
      return jwtResponse.jwt;
    }
    throw new Error('Unable to create JWT. Should never come here.');
  }
}
