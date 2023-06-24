/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Specification } from '@poozle/engine-edk';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  IntegrationDefinitionRequestIdBody,
  IntegrationDefinitionRequestWorkspaceIdBody,
} from './integration_definition.interface';
import { IntegrationDefinitionService } from './integration_definition.service';

@Controller({
  version: '1',
  path: 'integration_definition',
})
@ApiTags('Integration Definition')
export class IntegrationDefinitionController {
  constructor(
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getIntegrationDefinitionsByWorkspace(
    @Query()
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ) {
    return await this.integrationDefinitionService.getIntegrationDefinitionsForWorkspace(
      integrationDefinitionRequestWorkspaceIdBody,
    );
  }

  @Get(':integrationDefinitionId/spec')
  @UseGuards(new AuthGuard())
  async getSpecForIntegrationDefinition(
    @Param()
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
    @Query()
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ): Promise<Specification> {
    return await this.integrationDefinitionService.getSpecForIntegrationDefinition(
      integrationDefinitionRequestIdBody,
      integrationDefinitionRequestWorkspaceIdBody.workspaceId,
    );
  }

  @Get(':integrationDefinitionId')
  @UseGuards(new AuthGuard())
  async getIntegrationDefinitionWithId(
    @Param()
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
    @Query()
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ) {
    return await this.integrationDefinitionService.getIntegrationDefinitionWithId(
      integrationDefinitionRequestIdBody,
      integrationDefinitionRequestWorkspaceIdBody.workspaceId,
    );
  }
}
