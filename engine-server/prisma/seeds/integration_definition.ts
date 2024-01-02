/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-location */
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

  const integrationDefinitionsResponse: any = await axios.get(
    'https://raw.githubusercontent.com/levoai/build-artifacts/main/integration_definitions.json',
  );

  const totalIntegrationDefinitions = integrationDefinitionsResponse.data;

  const integrationDefinitionCreate: any[] = [];
  totalIntegrationDefinitions.forEach((integrationDefinition: any) => {
    const integrationExists = integrationDefinitions.find(
      (id) => id.key === integrationDefinition.key,
    );

    if (!integrationExists) {
      integrationDefinitionCreate.push({
        ...integrationDefinition,
        releaseStage:
          ReleaseStage[integrationDefinition.releaseStage as ReleaseStage],
        integrationType:
          IntegrationType[
            integrationDefinition.integrationType as IntegrationType
          ],
      });
    }
  });

  if (integrationDefinitionCreate.length > 0) {
    const createdIntegrationDefinitions =
      await prisma.integrationDefinition.createMany({
        data: integrationDefinitionCreate,
      });

    console.log(createdIntegrationDefinitions);
  }
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
