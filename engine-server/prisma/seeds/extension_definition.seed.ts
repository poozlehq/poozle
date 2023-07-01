/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType, PrismaClient, ReleaseStage } from '@prisma/client';
// import axios from 'axios';

const prisma = new PrismaClient();

type IntegrationDefinitions = Record<
  string,
  {
    name: string;
    key: string;
    icon: string;
    version: string;
    sourceUrl: string;
    releaseStage: string;
    integrationType: string;
  }
>;

async function main() {
  const integrationDefinitions = await prisma.integrationDefinition.findMany({
    where: {
      workspace: null,
    },
  });

  if (integrationDefinitions.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const extensionDefinitionsResponse: any = await axios.get(
    //   'https://raw.githubusercontent.com/poozlehq/engine/main/public/extensions.json',
    // );

    // const extensionDefinitions = extensionDefinitionsResponse.data;

    /**
     * TODO(Manoj): move this to integrations.json
     */
    const integrationDefinitions: IntegrationDefinitions = {
      github: {
        name: 'Github',
        key: 'github',
        icon: 'github.svg',
        version: '0.0.1',
        sourceUrl:
          'https://raw.githubusercontent.com/poozlehq/engine/ticketing/github/integrations/github/github/github.js',
        releaseStage: 'ALPHA',
        integrationType: 'TICKETING',
      },
      jira: {
        name: 'Jira',
        key: 'jira',
        icon: 'jira.svg',
        version: '0.0.1',
        sourceUrl:
          'https://raw.githubusercontent.com/poozlehq/engine/ticketing/github/integrations/github/github/jira.js',
        releaseStage: 'ALPHA',
        integrationType: 'TICKETING',
      },
    };

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
