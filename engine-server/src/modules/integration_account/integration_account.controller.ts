/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckResponse } from '@poozle/engine-edk';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import {
  CreateIntegrationAccountBody,
  IntegrationAccountsRequestBody,
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
  async checkCredentialsForIntegrationAccount(
    @Body()
    integrationCheckBody: IntegrationCheckBody,
    @Query()
    workspaceIdParams: IntegrationAccountsRequestBody,
  ): CheckResponse {
    return await this.integrationAccountService.checkForIntegrationCredentails(
      integrationCheckBody.integrationDefinitionId,
      integrationCheckBody.config,
      integrationCheckBody.authType,
      workspaceIdParams.workspaceId,
    );
  }

  @Get()
  async getIntegrationAccounts(
    @Query()
    integrationAccountsRequestBody: IntegrationAccountsRequestBody,
  ): Promise<IntegrationAccount[]> {
    return await this.integrationAccountService.getIntegrationAccountsForWorkspace(
      integrationAccountsRequestBody.workspaceId,
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
