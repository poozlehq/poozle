/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
} from './extension_definition.interface';
import { ExtensionDefinitionService } from './extension_definition.service';

@Resolver(() => ExtensionDefinition)
@UseGuards(GqlAuthGuard)
export class ExtensionDefinitionResolver {
  constructor(private extensionDefinitionService: ExtensionDefinitionService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => ExtensionDefinition)
  async getExtensionDefinitionById(
    @Args('data')
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinition> {
    return await this.extensionDefinitionService.getExtensionDefinitionWithId(
      extensionDefinitionRequestIdBody,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [ExtensionDefinition])
  getExtensionDefinitionsByWorkspace(
    @Args('data')
    extensionDefinitionRequestWorkspaceIdBody: ExtensionDefinitionRequestWorkspaceIdBody,
  ) {
    return this.extensionDefinitionService.getExtensionDefinitionsForWorkspace(
      extensionDefinitionRequestWorkspaceIdBody,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [ExtensionDefinition])
  getExtensionDefinitions() {
    return this.extensionDefinitionService.getAllExtensionDefinitions();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ExtensionDefinition)
  async createExtensionDefinition(
    @Args('data') createExtensionAccountInput: ExtensionDefinitionCreateBody,
  ) {
    this.extensionDefinitionService.createExtensionDefinition(
      createExtensionAccountInput,
    );
  }
}
