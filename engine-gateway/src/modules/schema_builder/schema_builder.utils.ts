/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  RenameRootTypes,
  RenameTypes,
  introspectSchema,
} from '@graphql-tools/wrap';
import { ExtensionAccount } from '@prisma/client';
import { print } from 'graphql';
import { createGraphQLSchema } from 'openapi-to-graphql-harshith';
import EncapsulateTransform from 'shared/encapsulate';

export function getPrefix(accountName: string) {
  return accountName.replace(/ /g, '_');
}

export async function getSchemaForGraphQL(
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

    const prefixName = getPrefix(account.name);
    return {
      schema: await introspectSchema(remoteExecutor),
      executor: remoteExecutor,
      transforms: [
        new EncapsulateTransform(account.extensionAccountName),
        new RenameTypes((name) => `${prefixName}_${name}`),
        new RenameRootTypes((name) => `${prefixName}_${name}`),
      ],
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function getSchemaForOPENAPI(
  extensionReachURL: string,
  account: ExtensionAccount,
) {
  try {
    const schemaResponse = await fetch(`${extensionReachURL}/schema`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account.extensionConfiguration),
    });

    const schemaFromExtension = await schemaResponse.json();
    const { schema } = await createGraphQLSchema(schemaFromExtension.schema, {
      headers: async (method: string, path: string, title, context) => {
        console.log(title, context);
        const headersResponse = await fetch(
          `${extensionReachURL}/get_auth_headers`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...(account.extensionConfiguration as Record<string, string>),
              context: {
                method,
                path,
              },
            }),
          },
        );
        const headers = await headersResponse.json();
        return headers;
      },
    });

    const prefixName = getPrefix(account.name);

    return {
      schema,
      transforms: [
        new EncapsulateTransform(account.extensionAccountName),
        new RenameTypes((name) => `${prefixName}_${name}`),
        new RenameRootTypes((name) => `${prefixName}_${name}`),
      ],
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
