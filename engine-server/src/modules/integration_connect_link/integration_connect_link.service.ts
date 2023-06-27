/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { IntegrationConnectLink } from '@@generated/integrationConnectLink/entities';

import {
  CreateIntegrationConnectLinkBody,
  GetIntegrationConnectLinkRequest,
  WorkspaceIdQueryRequest,
} from './integration_connect_link.interface';

@Injectable()
export class IntegrationConnectLinkService {
  constructor(private prisma: PrismaService) {}

  async createIntegrationConnectLink(
    createIntegrationConnectLinkBody: CreateIntegrationConnectLinkBody,
  ): Promise<IntegrationConnectLink> {
    return await this.prisma.integrationConnectLink.create({
      data: createIntegrationConnectLinkBody,
    });
  }

  async getIntegrationConnectLink(
    getIntegrationConnectLinkRequest: GetIntegrationConnectLinkRequest,
  ) {
    const integrationLinks = await this.prisma.integrationConnectLink.findMany({
      where: {
        workspaceId: getIntegrationConnectLinkRequest.workspaceId,
        integrationConnectionLinkId:
          getIntegrationConnectLinkRequest.integrationConnectLinkId,
      },
    });

    return integrationLinks[0];
  }

  async getIntegrationConnectLinksForWorkspace(
    workspaceIdQueryRequest: WorkspaceIdQueryRequest,
  ) {
    return await this.prisma.integrationConnectLink.findMany({
      where: {
        workspaceId: workspaceIdQueryRequest.workspaceId,
      },
    });
  }
}
