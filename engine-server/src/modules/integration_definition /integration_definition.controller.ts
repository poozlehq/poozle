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
import { Specification } from '@poozle/engine-idk';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  IntegrationDefinitionCreateBody,
  IntegrationDefinitionRequestIdBody,
  IntegrationDefinitionRequestWorkspaceIdBody,
} from './integration_definition.interface';
import { IntegrationDefinitionService } from './integration_definition.service';

@Controller({
  version: '1',
  path: 'integration_definition',
})
@ApiTags('Integration Definition')
@UseGuards(new AuthGuard())
export class IntegrationDefinitionController {
  constructor(
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

  @Get()
  async getIntegrationDefinitionsByWorkspace(
    @Query()
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ) {
    return await this.integrationDefinitionService.getIntegrationDefinitionsForWorkspace(
      integrationDefinitionRequestWorkspaceIdBody,
    );
  }

  @Get(':integrationDefinitionId/spec')
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

  @Post()
  async createIntegrationDefinition(
    @Body()
    integrationDefinitionCreateBody: IntegrationDefinitionCreateBody,
  ): Promise<IntegrationDefinition> {
    return await this.integrationDefinitionService.createIntegrationDefinition(
      integrationDefinitionCreateBody,
    );
  }

  @Get(':integrationDefinitionId')
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
