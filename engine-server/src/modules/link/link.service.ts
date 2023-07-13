/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { differenceInSeconds } from 'date-fns';
import { PrismaService } from 'nestjs-prisma';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Link } from '@@generated/link/entities';

import { IntegrationDefinitionService } from 'modules/integration_definition/integration_definition.service';

import {
  CreateLinkBody,
  GetLinkRequest,
  LinkIdentifierQueryParams,
  WorkspaceIdQueryRequest,
} from './link.interface';

@Injectable()
export class LinkService {
  constructor(
    private prisma: PrismaService,
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

  async createLink(createLinkBody: CreateLinkBody): Promise<Link> {
    return await this.prisma.link.create({
      data: createLinkBody,
    });
  }

  async getLink(
    getLinkRequest: GetLinkRequest,
    accountIdentifierQueryParams?: LinkIdentifierQueryParams,
  ) {
    const link = await this.prisma.link.findUniqueOrThrow({
      where: {
        linkId: getLinkRequest.linkId,
      },
      include: {
        IntegrationAccount: true,
      },
    });

    const differenceSeconds = differenceInSeconds(
      new Date(),
      new Date(link.createdAt),
    );

    let integrationDefinitions: IntegrationDefinition[] = [];

    if (!link.integrationDefinitionId) {
      integrationDefinitions =
        await this.integrationDefinitionService.getIntegrationDefinitionsForWorkspace(
          {
            workspaceId: link.workspaceId,
            category: link.category,
          },
        );
    } else {
      const integrationDefinition =
        await this.integrationDefinitionService.getIntegrationDefinitionWithId(
          {
            integrationDefinitionId: link.integrationDefinitionId,
          },
          link.workspaceId,
        );

      integrationDefinitions = [integrationDefinition];
    }

    const response = {
      expired: link.canExpire
        ? differenceSeconds < link.expiresIn
          ? false
          : true
        : false,
      ...link,
      integrationAccounts: accountIdentifierQueryParams?.accountIdentifier
        ? link.IntegrationAccount.filter(
            (ia) =>
              ia.accountIdentifier ===
              accountIdentifierQueryParams.accountIdentifier,
          ).map((integrationAccount) => ({
            integrationAccountId: integrationAccount.integrationAccountId,
            integrationDefinitionId: integrationAccount.integrationDefinitionId,
          }))
        : [],
      integrationDefinitions,
    };

    delete response['IntegrationAccount'];

    return response;
  }

  async getLinksForWorkspace(workspaceIdQueryRequest: WorkspaceIdQueryRequest) {
    const links = await this.prisma.link.findMany({
      where: {
        workspaceId: workspaceIdQueryRequest.workspaceId,
      },
    });

    return links.map((link) => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
        new Date(link.createdAt),
      );

      return {
        expired: link.canExpire
          ? differenceSeconds < link.expiresIn
            ? false
            : true
          : false,
        ...link,
      };
    });
  }
}
