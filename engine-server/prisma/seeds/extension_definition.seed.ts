/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as fs from 'fs';
import { resolve } from 'path';

import { ExtensionType, PrismaClient, ReleaseStage } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const extensionDefinitions = JSON.parse(
    fs.readFileSync(resolve('extension_definition.json'), 'utf8'),
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extensionDefinitionCreate = extensionDefinitions.map((ed: any) => ({
    ...ed,
    releaseStage: ReleaseStage[ed.releaseStage as ReleaseStage],
    extensionType: ExtensionType[ed.extensionType as ExtensionType],
  }));

  const createdExtensionDefinitions =
    await prisma.extensionDefinition.createMany({
      data: extensionDefinitionCreate,
    });

  console.log(createdExtensionDefinitions);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
