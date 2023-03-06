/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ExtensionRouter } from '@generated/extension-router/extension-router.model';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionRouterRequestIdBody,
  ExtensionRouterRequestUpdateBody,
  ExtensionRouterRequestWorkspaceIdBody,
} from './extension_router.interface';
import { ExtensionRouterService } from './extension_router.service';

@Resolver(() => ExtensionRouter)
@UseGuards(GqlAuthGuard)
export class ExtensionRouterResolver {
  constructor(private extensionRouterService: ExtensionRouterService) {}

  @Query(() => ExtensionRouter)
  async getExtensionRouterById(
    @Args('data')
    ExtensionRouterRequestIdBody: ExtensionRouterRequestIdBody,
  ): Promise<ExtensionRouter> {
    return await this.extensionRouterService.getExtensionRouterWithId(
      ExtensionRouterRequestIdBody,
    );
  }

  @Query(() => [ExtensionRouter])
  async getExtensionRoutersByWorkspace(
    @Args('data')
    ExtensionRouterRequestWorkspaceIdBody: ExtensionRouterRequestWorkspaceIdBody,
  ) {
    return await this.extensionRouterService.getExtensionRouterForWorkspace(
      ExtensionRouterRequestWorkspaceIdBody,
    );
  }

  @Mutation(() => ExtensionRouter)
  async updateExtensionRouter(
    @Args('data')
    extensionRouterRequestUpdateBody: ExtensionRouterRequestUpdateBody,
  ): Promise<ExtensionRouter> {
    return await this.extensionRouterService.updateExtensionRouter(
      extensionRouterRequestUpdateBody,
    );
  }
}
