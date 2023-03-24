/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ExtensionAuth } from '@generated/extension-auth/extension-auth.model';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionAuthRequestUpdateBody,
  ExtensionAuthCreateBody,
  ExtensionAuthRequestWorkspaceIdBody,
} from './webhook.interface';
import { ExtensionAuthService } from './webhook.service';

@Resolver(() => ExtensionAuth)
@UseGuards(GqlAuthGuard)
export class ExtensionAuthResolver {
  constructor(private extensionAuthService: ExtensionAuthService) {}

  @Query(() => [ExtensionAuth])
  async getExtensionAuthsByWorkspace(
    @Args('data')
    ExtensionAuthRequestWorkspaceIdBody: ExtensionAuthRequestWorkspaceIdBody,
  ) {
    return await this.extensionAuthService.getExtensionAuthForWorkspace(
      ExtensionAuthRequestWorkspaceIdBody,
    );
  }

  @Mutation(() => ExtensionAuth)
  async createExtensionDefinition(
    @Args('data') createExtensionAuthInput: ExtensionAuthCreateBody,
  ): Promise<ExtensionAuth> {
    return await this.extensionAuthService.createExtensionAuth(
      createExtensionAuthInput,
    );
  }

  @Mutation(() => ExtensionAuth)
  async updateExtensionAuth(
    @Args('data')
    extensionAuthRequestUpdateBody: ExtensionAuthRequestUpdateBody,
  ): Promise<ExtensionAuth> {
    return await this.extensionAuthService.updateExtensionAuth(
      extensionAuthRequestUpdateBody,
    );
  }
}
