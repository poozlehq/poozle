/** Copyright (c) 2022, Poozle, all rights reserved. **/

import {
  RenameRootTypes,
  RenameTypes,
  introspectSchema,
} from '@graphql-tools/wrap';
import { Injectable } from '@nestjs/common';
import { ExtensionAccount, ExtensionType } from '@prisma/client';
import { print } from 'graphql';
import { createGraphQLSchema } from 'openapi-to-graphql';
import EncapsulateTransform from 'shared/encapsulate';

import { PrismaService } from 'modules/prisma/prisma.service';

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

  async getSchemaForGraphQL(
    extensionReachURL: string,
    account: ExtensionAccount,
  ) {
    async function remoteExecutor({ document, variables }: any) {
      const query = print(document);
      const headersResponse = await fetch(
        `${extensionReachURL}/get_auth_headers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(account.extensionConfiguration),
        },
      );

      const headers = await headersResponse.json();
      const fetchResult = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(headers as any),
        },
        body: JSON.stringify({ query, variables }),
      });
      try {
        return await fetchResult.json();
      } catch (e) {
        console.log(e);
      }
    }

    return {
      schema: await introspectSchema(remoteExecutor),
      executor: remoteExecutor,
      transforms: [
        new EncapsulateTransform(account.extensionAccountName),
        new RenameTypes((name) => `${account.name}_${name}`),
        new RenameRootTypes((name) => `${account.name}_${name}`),
      ],
    };
  }

  async getSchemaForOPENAPI(
    extensionReachURL: string,
    account: ExtensionAccount,
  ) {
    const headersResponse = await fetch(
      `${extensionReachURL}/get_auth_headers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account.extensionConfiguration),
      },
    );
    const headers = await headersResponse.json();

    const schemaResponse = await fetch(`${extensionReachURL}/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const schemaFromExtension = await schemaResponse.json();
    const { schema } = await createGraphQLSchema(schemaFromExtension.schema, {
      headers: () => {
        return headers;
      },
    });

    return {
      schema,
      transforms: [
        new EncapsulateTransform(account.extensionAccountName),
        new RenameTypes((name) => `${account.name}_${name}`),
        new RenameRootTypes((name) => `${account.name}_${name}`),
      ],
    };
  }

  async getSchemaForAccount(account: ExtensionAccount) {
    const extensionDefinition = await this.getExtensionDefinitionFromId(
      account.extensionDefinitionId,
    );

    console.log(account, extensionDefinition);

    const extensionRouter = await this.getExtensionRouterFromDefinitionId(
      extensionDefinition.extensionDefinitionId,
    );

    if (extensionDefinition.extensionType === ExtensionType.GRAPHQL) {
      return await this.getSchemaForGraphQL(extensionRouter.endpoint, account);
    }

    if (extensionDefinition.extensionType === ExtensionType.OPENAPI) {
      return await this.getSchemaForOPENAPI(extensionRouter.endpoint, account);
    }

    return undefined;
  }

  async getSchema() {
    const accounts = await this.getAllExtensionAccountsInWorkspace();

    return Promise.all(
      accounts.map(async (account) => await this.getSchemaForAccount(account)),
    );
  }
}
