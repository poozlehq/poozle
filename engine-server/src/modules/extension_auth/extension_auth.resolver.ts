/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { ExtensionAuth } from '@generated/extension-auth/extension-auth.model';

import { exclude } from 'common/utils';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionAuthRequestUpdateBody,
  ExtensionAuthCreateBody,
  ExtensionAuthRequestWorkspaceIdBody,
  ExtensionAuthMask,
  ExtensionAuthRequestIdBody,
} from './extension_auth.interface';
import { ExtensionAuthService } from './extension_auth.service';

@Resolver(() => ExtensionAuth)
@UseGuards(GqlAuthGuard)
export class ExtensionAuthResolver {
  constructor(private extensionAuthService: ExtensionAuthService) {}

  @Query(() => [ExtensionAuth])
  async getExtensionAuthsByWorkspace(
    @Args('data')
    ExtensionAuthRequestWorkspaceIdBody: ExtensionAuthRequestWorkspaceIdBody,
  ) {
    return await this.extensionAuthService.getExtensionAuthsForWorkspace(
      ExtensionAuthRequestWorkspaceIdBody,
    );
  }

  @Mutation(() => ExtensionAuth)
  async createExtensionAuth(
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

  @Query(() => ExtensionAuth)
  async getExtensionAuth(
    @Args('data')
    extensionAuthRequestIdBody: ExtensionAuthRequestIdBody,
  ): Promise<ExtensionAuthMask> {
    const extensionAuth = await this.extensionAuthService.getExtensionAuth(
      extensionAuthRequestIdBody,
    );

    return exclude(extensionAuth, ['clientSecret']);
  }
}
