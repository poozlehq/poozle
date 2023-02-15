/** Copyright (c) 2023, Poozle, all rights reserved. **/

// This file generates the base64 string for the credentials stored

import * as fs from 'fs';
import { resolve } from 'path';

import { PrismaClient } from '@prisma/client';
import * as yaml from 'js-yaml';

const prisma = new PrismaClient();

async function main() {
  const allExtensionAccountsForWorkspace =
    await prisma.extensionAccount.findMany({
      where: {
        workspaceId: process.env.WORKSPACE_ID,
      },
    });

  const sources = allExtensionAccountsForWorkspace.map((account) => {
    const configHeaders = Buffer.from(
      JSON.stringify(account.extensionConfiguration),
    ).toString('base64');
    const accountName = account.name.replace('/ /g', '_');

    return {
      name: account.extensionAccountName,
      handler: {
        graphql: {
          endpoint: 'http://localhost:8000/graphql',
          operationHeaders: {
            config: configHeaders,
          },
        },
      },
      transforms: [
        {
          prefix: {
            mode: 'wrap',
            value: `${accountName}_`,
          },
        },
        {
          encapsulate: {
            name: account.extensionAccountName,
            applyTo: {
              query: true,
              mutation: true,
              subscription: true,
            },
          },
        },
      ],
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshConfig: any = {
    sources,
    serve: {
      playground: true,
    },
  };

  fs.writeFileSync(
    resolve('.meshrc.yml'),
    yaml.dump(meshConfig, {
      sortKeys: true,
      noRefs: true,
      lineWidth: -1,
    }),
  );
}

main();
