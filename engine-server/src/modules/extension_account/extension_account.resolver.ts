/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ExtensionAccount } from '@generated/extension-account/extension-account.model';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionAccountCreateBody,
  ExtensionAccountGetRequestBody,
  ExtensionAccountRequestIdBody,
  ExtensionAccountUpdateBody,
} from './extension_account.interface';
import { ExtensionAccountService } from './extension_account.service';

@Resolver(() => ExtensionAccount)
@UseGuards(GqlAuthGuard)
export class ExtensionAccountResolver {
  constructor(private extensionAccountService: ExtensionAccountService) {}

  // TODO (harshith): Later check here if the accountId belongs to the workspace
  // the user has access to otherwise don't allow the request
  @Query(() => ExtensionAccount)
  async getExtensionAccount(
    @Args('data') getExtensionAccountInput: ExtensionAccountRequestIdBody,
  ): Promise<ExtensionAccount> {
    return await this.extensionAccountService.getExtensionAccountWithId(
      getExtensionAccountInput,
    );
  }

  @Query(() => [ExtensionAccount])
  async getExtensionAccountsByWorkspace(
    @Args('data') getAllExtensionAccounts: ExtensionAccountGetRequestBody,
  ) {
    return await this.extensionAccountService.getAllExtensionAccountsInWorkspace(
      getAllExtensionAccounts,
    );
  }

  @Mutation(() => ExtensionAccount)
  async createExtensionAccount(
    @Args('data') createExtensionAccountInput: ExtensionAccountCreateBody,
  ) {
    return await this.extensionAccountService.createExtensionAccount(
      createExtensionAccountInput,
    );
  }

  @Mutation(() => ExtensionAccount)
  async updateExtensionAccount(
    @Args('data') updateExtensionAccountInput: ExtensionAccountUpdateBody,
  ) {
    return await this.extensionAccountService.updateExtensionAccount(
      updateExtensionAccountInput,
    );
  }
}
