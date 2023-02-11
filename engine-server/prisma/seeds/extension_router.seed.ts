/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {  PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const extensionDefinition = await prisma.extensionDefinition.findUnique({
    where: {
      extensionDefinitionId: "0f3c48aa-cf45-4b7c-af80-2f1dc11ceeb0"
    }
  });

  const createdExtensionRouter =
    await prisma.extensionRouter.create({
      data: {
        extensionDefinitionId: extensionDefinition.extensionDefinitionId,
        endpoint: 'http://localhost:8002',
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
