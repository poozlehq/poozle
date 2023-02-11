/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { ExtensionAccount, ExtensionType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import {
  getSchemaForGraphQL,
  getSchemaForOPENAPI,
} from './schema_builder.utils';

@Injectable()
export class SchemaBuilderService {
  constructor(private prisma: PrismaService) {}

  async getAllExtensionAccountsInWorkspace(): Promise<ExtensionAccount[]> {
    return this.prisma.extensionAccount.findMany({
      where: {
        workspaceId: process.env.WORKSPACE_ID,
      },
    });
  }

  async getExtensionDefinitionFromId(extensionDefinitionId: string) {
    return await this.prisma.extensionDefinition.findUnique({
      where: {
        extensionDefinitionId,
      },
    });
  }

  async getExtensionRouterFromDefinitionId(extensionDefinitionId: string) {
    return await this.prisma.extensionRouter.findUnique({
      where: {
        extensionDefinitionId,
      },
    });
  }

  // Get Schema for every account
  async getSchemaForAccount(account: ExtensionAccount) {
    const extensionDefinition = await this.getExtensionDefinitionFromId(
      account.extensionDefinitionId,
    );

    const extensionRouter = await this.getExtensionRouterFromDefinitionId(
      extensionDefinition.extensionDefinitionId,
    );

    // Get schema if the extension is GRAPHQL
    if (extensionDefinition.extensionType === ExtensionType.GRAPHQL) {
      return await getSchemaForGraphQL(extensionRouter.endpoint, account);
    }

    // Get schema if the extension is OPENAPI schema based
    if (extensionDefinition.extensionType === ExtensionType.OPENAPI) {
      return await getSchemaForOPENAPI(extensionRouter.endpoint, account);
    }

    return undefined;
  }

  // This function will return a array of all the schema for all extension accounts
  async getSchema() {
    const accounts = await this.getAllExtensionAccountsInWorkspace();

    return Promise.all(
      accounts.map(async (account) => await this.getSchemaForAccount(account)),
    );
  }
}
