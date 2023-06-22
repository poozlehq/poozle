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
  ) {
    return this.prisma.integrationDefinition.findUnique({
      where: {
        integrationDefinitionId:
          integrationDefinitionRequestIdBody.integrationDefinitionId,
      },
    });
  }

  async getSpecForIntegrationDefinition(
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
  ): Promise<Specification> {
    const integrationDefinition = await this.getIntegrationDefinitionWithId(
      integrationDefinitionRequestIdBody,
    );

    return await getIntegrationSpec(integrationDefinition.sourceUrl);
  }
}
