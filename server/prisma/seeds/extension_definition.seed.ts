/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  ExtensionType,
  FunctionEnv,
  PrismaClient,
  ReleaseStage,
} from '@prisma/client';

import extensionDefinitions from '../../extension_definition.json';

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.create({
    data: {
      slug: 'default',
    },
  });

  const extensionDefinitionCreate = extensionDefinitions.map((ed) => ({
    ...ed,
    workspace,
    functionEnv: FunctionEnv[ed.functionEnv as FunctionEnv],
    releaseStage: ReleaseStage[ed.releaseStage as ReleaseStage],
    extensionType: ExtensionType[ed.extensionType as ExtensionType],
  }));

  const createdExtensionDefinitions =
    await prisma.extensionDefinition.createMany({
      data: extensionDefinitionCreate,
    });

  console.log(createdExtensionDefinitions);
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
