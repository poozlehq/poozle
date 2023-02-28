/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '@generated/user/user.model';
import { Workspace } from '@generated/workspace/workspace.model';

import { UserEntity } from 'common/decorators/user.decorator';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  WorkspaceCreateBody,
  WorkspaceRequestIdBody,
} from './workspace.interface';
import { WorkspaceService } from './workspace.service';

@Resolver(() => Workspace)
@UseGuards(GqlAuthGuard)
export class WorkspaceResolver {
  constructor(private workspaceService: WorkspaceService) {}

  @Query(() => Workspace)
  async getWorkspaceWithId(
    @Args('data') workspaceRequestIdBody: WorkspaceRequestIdBody,
  ) {
    return this.workspaceService.getWorkspaceWithId(workspaceRequestIdBody);
  }

  @Query(() => [Workspace])
  async getWorkspaces(@UserEntity() user: User) {
    return this.workspaceService.getAllWorkspaces(user);
  }

  @Mutation(() => Workspace)
  async createWorkspace(
    @UserEntity() user: User,
    @Args('data') createWorkspaceBody: WorkspaceCreateBody,
  ) {
    return await this.workspaceService.createWorkspace(
      createWorkspaceBody,
      user,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Workspace)
  async deleteWorkspace(
    @Args('data') workspaceRequestIdBody: WorkspaceRequestIdBody,
  ) {
    return await this.workspaceService.deleteWorkspace(
      workspaceRequestIdBody
    );
  }
}
