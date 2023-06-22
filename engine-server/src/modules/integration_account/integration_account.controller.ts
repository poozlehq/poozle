/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckResponse } from '@poozle/engine-edk';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import {
  CreateIntegrationAccountBody,
  IntegrationCheckBody,
} from './integration_account.interface';
import { IntegrationAccountService } from './integration_account.service';

@Controller({
  version: '1',
  path: 'integration_account',
})
@ApiTags('Integration Account')
export class IntegrationAccountController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  @Post('check')
  async getSpecForIntegrationDefinition(
    @Body()
    integrationCheckBody: IntegrationCheckBody,
  ): CheckResponse {
    return await this.integrationAccountService.checkForIntegrationCredentails(
      integrationCheckBody.integrationDefinitionId,
      integrationCheckBody.config,
      integrationCheckBody.authType,
    );
  }

  @Post()
  async createIntegrationAccount(
    @Body()
    createIntegrationAccountBody: CreateIntegrationAccountBody,
  ): Promise<IntegrationAccount> {
    return await this.integrationAccountService.createIntegrationAccount(
      createIntegrationAccountBody.integrationDefinitionId,
      createIntegrationAccountBody.config,
      createIntegrationAccountBody.integrationAccountName,
      createIntegrationAccountBody.authType,
      createIntegrationAccountBody.workspaceId,
    );
  }
}
