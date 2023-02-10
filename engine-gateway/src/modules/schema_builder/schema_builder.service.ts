/** Copyright (c) 2022, Poozle, all rights reserved. **/

import {
  RenameRootTypes,
  RenameTypes,
  introspectSchema,
} from '@graphql-tools/wrap';
import { Injectable } from '@nestjs/common';
import { ExtensionAccount, ExtensionType } from '@prisma/client';
import { print } from 'graphql';
import { PrismaService } from 'nestjs-prisma';
import { createGraphQLSchema } from 'openapi-to-graphql-harshith';
import EncapsulateTransform from 'shared/encapsulate';

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
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const fetchResult = await fetch(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (account.extensionConfiguration as any).graphQLEndpoint,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(headers as any),
            },
            body: JSON.stringify({ query, variables }),
          },
        );
        try {
          return await fetchResult.json();
        } catch (e) {
          return undefined;
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
    } catch (e) {
      return undefined;
    }
  }

  async getSchemaForOPENAPI(
    extensionReachURL: string,
    account: ExtensionAccount,
  ) {
    try {
      const schemaResponse = await fetch(`${extensionReachURL}/schema`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const schemaFromExtension = await schemaResponse.json();
      const { schema } = await createGraphQLSchema(schemaFromExtension.schema, {
        headers: async () => {
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
          return headers as Record<string, string>;
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
    } catch (e) {
      return undefined;
    }
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
      return await this.getSchemaForGraphQL(extensionRouter.endpoint, account);
    }

    // Get schema if the extension is OPENAPI schema based
    if (extensionDefinition.extensionType === ExtensionType.OPENAPI) {
      return await this.getSchemaForOPENAPI(extensionRouter.endpoint, account);
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
