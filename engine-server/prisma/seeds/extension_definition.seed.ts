/* eslint-disable dot-location */
/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ExtensionType, PrismaClient, ReleaseStage } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  const extensionDefinitions = await prisma.extensionDefinition.findMany({
    where: {
      workspace: null,
    },
  });

  if (extensionDefinitions.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extensionDefinitionsResponse: any = await axios.get(
      'https://raw.githubusercontent.com/poozlehq/engine/main/public/extensions.json',
    );

    const extensionDefinitions = extensionDefinitionsResponse.data;

    const extensionDefinitionCreate = Object.keys(extensionDefinitions).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: any) => {
        const ed = {
          key,
          ...extensionDefinitions[key],
        };
        return {
          ...ed,
          releaseStage: ReleaseStage[ed.releaseStage as ReleaseStage],
          extensionType: ExtensionType[ed.extensionType as ExtensionType],
        };
      },
    );

    const createdExtensionDefinitions =
      await prisma.extensionDefinition.createMany({
        data: extensionDefinitionCreate,
      });

    console.log(createdExtensionDefinitions);
  }

  /**
   * TODO (harshith): Add more logic to add new extensions from integrations.json
   */
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
