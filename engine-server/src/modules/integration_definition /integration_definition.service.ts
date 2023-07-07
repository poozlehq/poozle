/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BadRequestException, Injectable } from '@nestjs/common';
import { Specification } from '@poozle/engine-idk';
import { ReleaseStage } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { getIntegrationSpec } from 'shared/integration_run_utils';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

import {
  IntegrationDefinitionCreateBody,
  IntegrationDefinitionRequestIdBody,
  IntegrationDefinitionRequestWorkspaceIdBody,
  IntegrationDefinitionResponse,
  IntegrationDefinitionUpdateBody,
} from './integration_definition.interface';

@Injectable()
export class IntegrationDefinitionService {
  constructor(private prisma: PrismaService) {}

  async getIntegrationDefinitionsForWorkspace(
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ): Promise<IntegrationDefinitionResponse[]> {
    let ORRequests = [
      {
        workspaceId: integrationDefinitionRequestWorkspaceIdBody.workspaceId,
      },
      {
        workspaceId: null,
      },
    ];

    if (
      integrationDefinitionRequestWorkspaceIdBody.category &&
      integrationDefinitionRequestWorkspaceIdBody.category.length > 0
    ) {
      ORRequests = [
        ...integrationDefinitionRequestWorkspaceIdBody.category.map((cat) => ({
          workspaceId: integrationDefinitionRequestWorkspaceIdBody.workspaceId,
          integrationType: cat,
        })),
        ...integrationDefinitionRequestWorkspaceIdBody.category.map((cat) => ({
          workspaceId: null,
          integrationType: cat,
        })),
      ];
    }

    const integrationDefinitions =
      await this.prisma.integrationDefinition.findMany({
        where: {
          OR: [...ORRequests],
        },
      });

    return (await this.checkIfItsLatest(
      integrationDefinitions,
    )) as IntegrationDefinitionResponse[];
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

    return (await this.checkIfItsLatest(
      integrationDefinitions[0],
    )) as IntegrationDefinitionResponse;
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

      return await this.prisma.integrationDefinition.create({
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

  async updateIntegrationDefinition(
    integrationDefinitionUpdateBody: IntegrationDefinitionUpdateBody,
    integrationDefinitionId: string,
  ) {
    try {
      await getIntegrationSpec(integrationDefinitionUpdateBody.sourceUrl);

      return await this.prisma.integrationDefinition.update({
        data: {
          sourceUrl: integrationDefinitionUpdateBody.sourceUrl,
          version: integrationDefinitionUpdateBody.version,
        },
        where: {
          integrationDefinitionId,
        },
      });
    } catch (err) {
      throw new BadRequestException('Unable to fetch spec');
    }
  }

  async checkIfItsLatest(
    integrationDefinition: IntegrationDefinition | IntegrationDefinition[],
  ): Promise<IntegrationDefinitionResponse | IntegrationDefinitionResponse[]> {
    const {
      data: integrationDefinitionsResponse,
    }: { data: IntegrationDefinition[] } = await axios.get(
      'https://raw.githubusercontent.com/poozlehq/engine/main/integration_definitions.json',
    );

    const integrationDefinitions: Record<string, IntegrationDefinition> = {};

    integrationDefinitionsResponse.forEach((id: IntegrationDefinition) => {
      integrationDefinitions[id.key] = id;
    });

    if (Array.isArray(integrationDefinition)) {
      return integrationDefinition.map((id) => {
        const latestDetails = {
          isLatest: integrationDefinitions[id.key]
            ? id.version === integrationDefinitions[id.key].version
            : true,
          latestVersion: integrationDefinitions[id.key]
            ? integrationDefinitions[id.key].version
            : id.version,
          latestVersionSource: integrationDefinitions[id.key]
            ? integrationDefinitions[id.key].sourceUrl
            : id.sourceUrl,
        };

        return {
          ...id,
          ...latestDetails,
        };
      });
    }

    const latestDetails = {
      isLatest:
        integrationDefinition.version ===
        integrationDefinitions[integrationDefinition.key].version,
      latestVersion: integrationDefinitions[integrationDefinition.key].version,
      latestVersionSource:
        integrationDefinitions[integrationDefinition.key].sourceUrl,
    };

    return {
      ...integrationDefinition,
      ...latestDetails,
    };
  }
}
