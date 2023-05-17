/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

// This file generates the base64 string for the credentials stored
import * as fs from 'fs';
import { resolve } from 'path';

import axios from 'axios';
import * as yaml from 'js-yaml';
import { createLogger, transports, format } from 'winston';

import { ExtensionType, PrismaClient } from './client';

/**
 * Later move this into another file
 * Right now it is failing because we are building with
 */
export const sampleSource = {
  name: 'sample',
  handler: {
    graphql: {
      endpoint: 'https://spacex-production.up.railway.app/',
    },
  },
  transforms: [
    {
      prefix: {
        mode: 'wrap',
        value: `sample_`,
      },
    },
    {
      encapsulate: {
        name: 'sample',
        applyTo: {
          query: true,
          mutation: true,
          subscription: true,
        },
      },
    },
  ],
};

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

async function main(): Promise<null> {
  // Don't let this through if WORKSPACE_ID is not found in the process

  if (!process.env.WORKSPACE_ID) {
    logger.error(`WORKSPACE_ID is not configured`);

    return null;
  }

  // Fetch all the extension accounts for this workspace
  const allExtensionAccountsForWorkspace =
    await prisma.extensionAccount.findMany({
      where: {
        workspaceId: process.env.WORKSPACE_ID,
      },
      include: { extensionDefinition: true },
    });
  logger.info(
    `Total ${allExtensionAccountsForWorkspace.length} are found for this workspace`,
  );

  const gateway = await prisma.gateway.findMany({
    where: {
      workspaceId: process.env.WORKSPACE_ID,
    },
  });

  /*
    Loop through all the accounts and generate a base64 with the
    configuration saved
  */
  const sources = await Promise.all(
    allExtensionAccountsForWorkspace
      .map(async (account) => {
        const configHeaders = Buffer.from(
          JSON.stringify(account.extensionConfiguration),
        ).toString('base64');
        const accountName = account.name.replace(/ /g, '_');
        const extensionAccountName = account.extensionAccountName.replace(
          / /g,
          '_',
        );

        const extensionDefinition = account.extensionDefinition;
        const specLink = extensionDefinition.spec;

        const specResponse = await axios.get(specLink);
        const spec = specResponse.data;
        const specForAuthType = spec[account.authType];

        const operationHeaders = {
          config: configHeaders,
          spec: JSON.stringify(specForAuthType),
          name: extensionAccountName,
          /**
           * TODO(harshith): Change this later to value fetched from database
           */
          redisExpiry: 60,
          authType: account.authType,
        };

        return {
          name: extensionAccountName,
          handler:
            extensionDefinition.extensionType === ExtensionType.GRAPHQL
              ? {
                  graphql: {
                    // TODO (harshith): Remove static URL and move this to ExtensionRouter based
                    endpoint: extensionDefinition.source,
                    operationHeaders,
                  },
                }
              : {
                  openapi: {
                    // TODO (harshith): Remove static URL and move this to ExtensionRouter based
                    source: extensionDefinition.source,
                    operationHeaders,
                  },
                },
          transforms: [
            {
              /* 
                This plugin is used so that we can merge the types and roots when same extension is configured
                multiple times.
              */
              prefix: {
                mode: 'wrap',
                value: `${accountName}_`,
              },
            },
            {
              /* 
                This is used so that we can write queries easily when multiple accounts are configured
                for the same Extension
                query {
                  github_1 {

                  }
                  github_2 {

                  }
                }
              */
              encapsulate: {
                name: extensionAccountName,
                applyTo: {
                  query: true,
                  mutation: true,
                  subscription: true,
                },
              },
            },
          ],
        };
      })
      .filter(Boolean),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshConfig: any = {
    sources: [...sources, sampleSource],
    // TODO (harshith): remove this playground configuration from here
    serve: {
      playgroundTitle: 'Poozle playground',
      playground: true,
    },
    additionalEnvelopPlugins: './src/envelopPlugins',
  };
  if (gateway.length) {
    meshConfig.plugins = [
      {
        hive: {
          token: gateway[0].hiveToken,
          usage: {
            clientInfo: {
              name: process.env.WORKSPACE_ID,
              version: Date.now().toString(),
            },
            processVariables: true,
            exclude: ['Sample', 'IntrospectionQuery'],
          },
          reporting: {
            author: process.env.WORKSPACE_ID,
            commit: Date.now().toString(),
          },
        },
      },
    ];
  }

  // Write the yaml to meshrc which is used to create the server
  fs.writeFileSync(
    resolve('.meshrc.yml'),
    yaml.dump(meshConfig, {
      sortKeys: true,
      noRefs: true,
      lineWidth: -1,
    }),
  );

  logger.info(`Saved the configuration to .meshrc.yml`);

  return null;
}

main();
