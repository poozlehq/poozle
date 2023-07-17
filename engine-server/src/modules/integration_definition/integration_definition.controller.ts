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
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Specification } from '@poozle/engine-idk';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  IntegrationDefinitionCreateBody,
  IntegrationDefinitionRequestIdBody,
  IntegrationDefinitionRequestWorkspaceIdBody,
  IntegrationDefinitionUpdateBody,
} from './integration_definition.interface';
import { IntegrationDefinitionService } from './integration_definition.service';

@Controller({
  version: '1',
  path: 'integration_definition',
})
@ApiTags('Integration Definition')
@ApiBadRequestResponse({
  status: 400,
  type: 'string',
  description: 'Bad Request',
})
@ApiUnauthorizedResponse({
  status: 401,
  type: 'string',
  description: 'Not authorised',
})
export class IntegrationDefinitionController {
  constructor(
    private integrationDefinitionService: IntegrationDefinitionService,
  ) {}

  /**
   * Get all integration definitions in a workspace
   */
  @Get()
  async getIntegrationDefinitionsByWorkspace(
    @Query()
    integrationDefinitionRequestWorkspaceIdBody: IntegrationDefinitionRequestWorkspaceIdBody,
  ) {
    return await this.integrationDefinitionService.getIntegrationDefinitionsForWorkspace(
      integrationDefinitionRequestWorkspaceIdBody,
    );
  }

  /**
   * Update a integration definition in a workspace
   */
  @Post(':integrationDefinitionId')
  async updateIntegrationDefinition(
    @Param()
    integrationDefinitionRequestIdBody: IntegrationDefinitionRequestIdBody,
    @Body()
    integrationDefinitionUpdateBody: IntegrationDefinitionUpdateBody,
  ) {
    return await this.integrationDefinitionService.updateIntegrationDefinition(
      integrationDefinitionUpdateBody,
      integrationDefinitionRequestIdBody.integrationDefinitionId,
    );
  }

  /**
   * Get spec for integration definition in a workspace
   */
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

  /**
   * Create a integration definition.
   * Used for custom integrations
   */
  @Post()
  @UseGuards(new AuthGuard())
  async createIntegrationDefinition(
    @Body()
    integrationDefinitionCreateBody: IntegrationDefinitionCreateBody,
  ): Promise<IntegrationDefinition> {
    return await this.integrationDefinitionService.createIntegrationDefinition(
      integrationDefinitionCreateBody,
    );
  }

  /**
   * Get a integration definition in a workspace
   */
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
