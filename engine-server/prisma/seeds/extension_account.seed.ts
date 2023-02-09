/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {  PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.findFirst();
  const extensionDefinition = (await prisma.extensionDefinition.findMany()).pop()

  const createdExtensionAccount =
    await prisma.extensionAccount.create({
      data: {
        extensionDefinitionId: extensionDefinition.extensionDefinitionId,
        extensionConfiguration: {
          "api_key": ""
        },
        name: extensionDefinition.name,
        extensionAccountName: 'notion_1',
        workspaceId: workspace.workspaceId
      },
    });

  console.log(createdExtensionAccount);
}

main().
  then(async () => {
    await prisma.$disconnect();
  }).
  catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
