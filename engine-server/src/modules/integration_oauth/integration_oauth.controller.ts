/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  IntegrationOAuthAppsFlat,
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
  @UseGuards(new AuthGuard())
  async getIntegrationOAuthByWorkspace(
    @Query()
    integrationOAuthRequestWorkspaceIdBody: IntegrationOAuthRequestWorkspaceIdBody,
  ): Promise<IntegrationOAuthApp[]> {
    return await this.integrationOAuthService.getIntegrationOAuthsForWorkspace(
      integrationOAuthRequestWorkspaceIdBody,
    );
  }

  @Get('just_ids')
  async getIntegrationOAuthByWorkspaceJustIds(
    @Query()
    integrationOAuthRequestWorkspaceIdBody: IntegrationOAuthRequestWorkspaceIdBody,
  ): Promise<IntegrationOAuthAppsFlat[]> {
    const integrationOAuthApps =
      await this.integrationOAuthService.getIntegrationOAuthsForWorkspace(
        integrationOAuthRequestWorkspaceIdBody,
      );

    return integrationOAuthApps.map((oAuthApp) => ({
      integrationDefinitionId: oAuthApp.integrationDefinitionId,
      integrationOAuthAppId: oAuthApp.integrationOAuthAppId,
    }));
  }

  @Post()
  @UseGuards(new AuthGuard())
  async createIntegrationOAuthApp(
    @Body()
    integrationOAuthCreateBody: IntegrationOAuthCreateBody,
  ): Promise<IntegrationOAuthApp> {
    return await this.integrationOAuthService.createIntegrationOAuth(
      integrationOAuthCreateBody,
    );
  }

  @Post(':integrationOAuthAppId')
  @UseGuards(new AuthGuard())
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
  @UseGuards(new AuthGuard())
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
