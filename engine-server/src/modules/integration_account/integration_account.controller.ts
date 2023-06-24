/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckResponse } from '@poozle/engine-edk';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import {
  CreateIntegrationAccountBody,
  IntegrationAccountRequestIdBody,
  IntegrationAccountsRequestBody,
  IntegrationCheckBody,
  UpdateIntegrationAccountBody,
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
  ): CheckResponse {
    return await this.integrationAccountService.checkForIntegrationCredentails(
      integrationCheckBody.integrationDefinitionId,
      integrationCheckBody.config,
      integrationCheckBody.authType,
      integrationCheckBody.workspaceId,
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

  @Get(':integrationAccountId')
  async getIntegrationAccount(
    @Param()
    integrationAccountIdRequestIdBody: IntegrationAccountRequestIdBody,
  ): Promise<IntegrationAccount> {
    return await this.integrationAccountService.getIntegrationAccountWithId(
      integrationAccountIdRequestIdBody,
    );
  }

  @Post(':integrationAccountId')
  async updateIntegrationAccount(
    @Param()
    integrationAccountIdRequestIdBody: IntegrationAccountRequestIdBody,
    @Body()
    updateIntegrationAccountBody: UpdateIntegrationAccountBody,
  ): Promise<IntegrationAccount> {
    return await this.integrationAccountService.updateIntegrationAccount(
      integrationAccountIdRequestIdBody.integrationAccountId,
      updateIntegrationAccountBody,
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
