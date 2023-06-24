/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp.entity';

import {
  IntegrationOAuthCreateBody,
  IntegrationOAuthRequestIdBody,
  IntegrationOAuthRequestUpdateBody,
  IntegrationOAuthRequestWorkspaceIdBody,
} from './integration_oauth.interface';
import { IntegrationOAuthService } from './integration_oauth.service';

@Controller({
  version: '1',
  path: 'integration_oauth',
})
@ApiTags('Integration OAuth Apps')
export class IntegrationOAuthController {
  constructor(private integrationOAuthService: IntegrationOAuthService) {}

  @Get()
  async getIntegrationOAuthByWorkspace(
    @Query()
    integrationOAuthRequestWorkspaceIdBody: IntegrationOAuthRequestWorkspaceIdBody,
  ): Promise<IntegrationOAuthApp[]> {
    return await this.integrationOAuthService.getIntegrationOAuthsForWorkspace(
      integrationOAuthRequestWorkspaceIdBody,
    );
  }

  @Post()
  async createIntegrationOAuthApp(
    @Body()
    integrationOAuthCreateBody: IntegrationOAuthCreateBody,
  ): Promise<IntegrationOAuthApp> {
    return await this.integrationOAuthService.createIntegrationOAuth(
      integrationOAuthCreateBody,
    );
  }

  @Post(':integrationOAuthAppId')
  async updateIntegrationOAuthApp(
    @Param()
    integrationOAuthRequestIdBody: IntegrationOAuthRequestIdBody,
    @Body()
    integrationOAuthRequestUpdateBody: IntegrationOAuthRequestUpdateBody,
  ): Promise<IntegrationOAuthApp> {
    return await this.integrationOAuthService.updateIntegrationOAuth(
      integrationOAuthRequestIdBody.integrationOAuthAppId,
      integrationOAuthRequestUpdateBody,
    );
  }

  @Get(':integrationOAuthAppId')
  async getIntegrationOAuthApp(
    @Param()
    integrationOAuthRequestIdBody: IntegrationOAuthRequestIdBody,
    @Query()
    integrationOAuthRequestWorkspaceIdBody: IntegrationOAuthRequestWorkspaceIdBody,
  ): Promise<IntegrationOAuthApp> {
    return await this.integrationOAuthService.getIntegrationOAuthApp(
      integrationOAuthRequestIdBody,
      integrationOAuthRequestWorkspaceIdBody.workspaceId,
    );
  }
}
