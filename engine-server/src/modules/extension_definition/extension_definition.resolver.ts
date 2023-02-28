/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionCreateBody,
  ExtensionDefinitionRequestWorkspaceIdBody,
  ExtensionDefinitionSpec,
} from './extension_definition.interface';
import { ExtensionDefinitionService } from './extension_definition.service';

@Resolver(() => ExtensionDefinition)
@UseGuards(GqlAuthGuard)
export class ExtensionDefinitionResolver {
  constructor(private extensionDefinitionService: ExtensionDefinitionService) {}

  @Query(() => ExtensionDefinition)
  async getExtensionDefinitionById(
    @Args('data')
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinition> {
    return await this.extensionDefinitionService.getExtensionDefinitionWithId(
      extensionDefinitionRequestIdBody,
    );
  }

  @Query(() => [ExtensionDefinition])
  async getExtensionDefinitionsByWorkspace(
    @Args('data')
    extensionDefinitionRequestWorkspaceIdBody: ExtensionDefinitionRequestWorkspaceIdBody,
  ) {
    return await this.extensionDefinitionService.getExtensionDefinitionsForWorkspace(
      extensionDefinitionRequestWorkspaceIdBody,
    );
  }

  @Query(() => [ExtensionDefinition])
  async getExtensionDefinitions() {
    return await this.extensionDefinitionService.getAllExtensionDefinitions();
  }

  @Query(() => ExtensionDefinitionSpec)
  async getSpecForExtensionDefinition(
    @Args('data')
    extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinitionSpec> {
    return await this.extensionDefinitionService.getSpecForExtensionDefinition(
      extensionDefinitionRequestIdBody,
    );
  }

  @Mutation(() => ExtensionDefinition)
  async createExtensionDefinition(
    @Args('data') createExtensionAccountInput: ExtensionDefinitionCreateBody,
  ) {
    this.extensionDefinitionService.createExtensionDefinition(
      createExtensionAccountInput,
    );
  }
}
