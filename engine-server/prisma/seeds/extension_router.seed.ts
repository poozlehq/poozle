/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {  PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const extensionDefinition = await prisma.extensionDefinition.findUnique({
    where: {
      extensionDefinitionId: "4e58bc7a-95b5-4ea0-85f6-c883e3e09c63"
    }
  });

  const createdExtensionRouter =
    await prisma.extensionRouter.create({
      data: {
        extensionDefinitionId: extensionDefinition.extensionDefinitionId,
        endpoint: 'http://localhost:8001',
      },
    });

  console.log(createdExtensionRouter);
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
