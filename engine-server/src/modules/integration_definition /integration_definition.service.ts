/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BadRequestException, Injectable } from '@nestjs/common';
import { Specification } from '@poozle/engine-edk';
import { ReleaseStage } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { getIntegrationSpec } from 'shared/integration_run_utils';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

import {
  IntegrationDefinitionCreateBody,
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

    return await getIntegrationSpec(integrationDefinition.sourceUrl);
  }

  async createIntegrationDefinition(
    integrationDefinitionCreateBody: IntegrationDefinitionCreateBody,
  ) {
    try {
      await getIntegrationSpec(integrationDefinitionCreateBody.sourceUrl);

      return this.prisma.integrationDefinition.create({
        data: {
          ...integrationDefinitionCreateBody,
          key: integrationDefinitionCreateBody.name
            .toLowerCase()
            .replace(/ /g, '_'),
          releaseStage: ReleaseStage.CUSTOM,
          icon: 'custom.svg',
        },
      });
    } catch (err) {
      throw new BadRequestException('Unable to fetch spec');
    }
  }
}
