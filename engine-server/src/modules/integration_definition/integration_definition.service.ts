/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BadRequestException, Injectable } from '@nestjs/common';
import { Specification } from '@poozle/engine-idk';
import { IntegrationType, ReleaseStage } from '@prisma/client';
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
      'https://raw.githubusercontent.com/levoai/build-artifacts/main/integration_definitions.json',
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
      isLatest: integrationDefinitions[integrationDefinition.key]
        ? integrationDefinition.version ===
          integrationDefinitions[integrationDefinition.key].version
        : true,
      latestVersion: integrationDefinitions[integrationDefinition.key]
        ? integrationDefinitions[integrationDefinition.key].version
        : integrationDefinition.version,
      latestVersionSource: integrationDefinitions[integrationDefinition.key]
        ? integrationDefinitions[integrationDefinition.key].sourceUrl
        : integrationDefinition.sourceUrl,
    };

    return {
      ...integrationDefinition,
      ...latestDetails,
    };
  }

  async updateIntegrationDefinitions(workspaceId: string) {
    const integrationDefinitions =
      await this.prisma.integrationDefinition.findMany({
        where: {
          workspaceId,
        },
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const integrationDefinitionsResponse: any = await axios.get(
      'https://raw.githubusercontent.com/levoai/build-artifacts/main/integration_definitions.json',
    );

    const totalIntegrationDefinitions = integrationDefinitionsResponse.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const integrationDefinitionCreate: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    totalIntegrationDefinitions.forEach((integrationDefinition: any) => {
      const integrationExists = integrationDefinitions.find(
        (id) => id.key === integrationDefinition.key,
      );

      if (!integrationExists) {
        integrationDefinitionCreate.push({
          ...integrationDefinition,
          workspaceId,
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
      await this.prisma.integrationDefinition.createMany({
        data: integrationDefinitionCreate,
      });
    }
  }
}
