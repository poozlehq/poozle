/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType, PrismaClient, ReleaseStage } from '@prisma/client';
import axios from 'axios';
// import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  const integrationDefinitions = await prisma.integrationDefinition.findMany({
    where: {
      workspace: null,
    },
  });

  if (integrationDefinitions.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const integrationDefinitionsResponse: any = await axios.get(
      'https://raw.githubusercontent.com/poozlehq/engine/main/integration_definitions.json',
    );

    const integrationDefinitions = integrationDefinitionsResponse.data;

    console.log(integrationDefinitions);

    const integrationDefinitionCreate = Object.keys(integrationDefinitions).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => {
        const ed = {
          ...integrationDefinitions[key],
        };
        return {
          ...ed,
          releaseStage: ReleaseStage[ed.releaseStage as ReleaseStage],
          integrationType:
            IntegrationType[ed.integrationType as IntegrationType],
        };
      },
    );

    const createdIntegrationDefinitions =
      await prisma.integrationDefinition.createMany({
        data: integrationDefinitionCreate,
      });

    console.log(createdIntegrationDefinitions);
  }

  /**
   * TODO (harshith): Add more logic to add new integration from integrations.json
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
