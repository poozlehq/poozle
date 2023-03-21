/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '@generated/user/user.model';

import { UserEntity } from 'common/decorators/user.decorator';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import { ChangePasswordInput, UpdateUserInput } from './user.interface';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.userService.updateUser(user.userId, newUserData);
  }

  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput,
  ) {
    return this.userService.changePassword(
      user.userId,
      user.password,
      changePassword,
    );
  }
}
