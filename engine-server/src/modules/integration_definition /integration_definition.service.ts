/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Specification } from '@poozle/engine-edk';
import { PrismaService } from 'nestjs-prisma';
import { getIntegrationSpec } from 'shared/integration_run_utils';

import { IntegrationDefinition } from '@@generated/integrationDefinition.entity';

import {
  IntegrationDefinitionRequestIdBody,
  IntegrationDefinitionRequestWorkspaceIdBody,
} from './integration_definition.interface';

@Injectable()
export class IntegrationDefinitionService {
  constructor(private prisma: PrismaService) {}

  async getIntegrationDefinitionsForWorkspace(
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ): Promise<IntegrationDefinition[]> {
    return this.prisma.integrationDefinition.findMany({
      where: {
        OR: [
          {
            workspaceId:
              integrationDefinitionRequestWorkspaceIdBody.workspaceId,
          },
          {
            workspaceId: null,
          },
        ],
      },
    });
  }

  async getIntegrationDefinitionWithId(
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
    workspaceId: string,
  ) {
    const integrationDefinitions =
      await this.prisma.integrationDefinition.findMany({
        where: {
          OR: [
            {
              integrationDefinitionId:
                integrationDefinitionRequestIdBody.integrationDefinitionId,
              workspaceId,
            },
            {
              integrationDefinitionId:
                integrationDefinitionRequestIdBody.integrationDefinitionId,
              workspaceId: null,
            },
          ],
        },
      });

    return integrationDefinitions[0];
  }

  async getSpecForIntegrationDefinition(
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
    workspaceId: string,
  ): Promise<Specification> {
    const integrationDefinition = await this.getIntegrationDefinitionWithId(
      integrationDefinitionRequestIdBody,
      workspaceId,
    );
    console.log(integrationDefinition);

    return await getIntegrationSpec(integrationDefinition.sourceUrl);
  }
}
