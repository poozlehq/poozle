/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IntegrationConnectLink } from '@@generated/integrationConnectLink/entities';

import {
  CreateIntegrationConnectLinkBody,
  IntegrationConnectLinkIdRequest,
  WorkspaceIdQueryRequest,
} from './integration_connect_link.interface';
import { IntegrationConnectLinkService } from './integration_connect_link.service';

@Controller({
  version: '1',
  path: 'integration_connect_link',
})
@ApiTags('Integration Connect Link')
export class IntegrationConnectLinkController {
  constructor(
    private integrationConnectLinkService: IntegrationConnectLinkService,
  ) {}

  @Get(':integrationConnectLinkId')
  async getIntegrationConnectLink(
    @Param()
    integrationConnectLinkIdRequest: IntegrationConnectLinkIdRequest,
    @Query()
    workspaceIdQueryRequest: WorkspaceIdQueryRequest,
  ): Promise<IntegrationConnectLink> {
    return await this.integrationConnectLinkService.getIntegrationConnectLink({
      integrationConnectLinkId:
        integrationConnectLinkIdRequest.integrationConnectLinkId,
      workspaceId: workspaceIdQueryRequest.workspaceId,
    });
  }

  @Post()
  async createIntegrationConnectLink(
    @Body()
    createIntegrationConnectLinkBody: CreateIntegrationConnectLinkBody,
  ): Promise<IntegrationConnectLink> {
    return await this.integrationConnectLinkService.createIntegrationConnectLink(
      createIntegrationConnectLinkBody,
    );
  }

  @Post()
  async getIntegrationConnectLinksForWorkspace(
    @Query()
    workspaceIdQueryRequest: WorkspaceIdQueryRequest,
  ): Promise<IntegrationConnectLink[]> {
    return await this.integrationConnectLinkService.getIntegrationConnectLinksForWorkspace(
      workspaceIdQueryRequest,
    );
  }
}
