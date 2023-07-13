/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  All,
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckResponse } from '@poozle/engine-idk';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { AuthGuard } from 'modules/auth/auth.guard';
import { LinkService } from 'modules/link/link.service';

import {
  CreateIntegrationAccountBody,
  CreateIntegrationAccountWithLinkBody,
  IntegrationAccountRequestIdBody,
  IntegrationAccountWithLinkRequestIdBody,
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
  constructor(
    private integrationAccountService: IntegrationAccountService,
    private linkService: LinkService,
  ) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getIntegrationAccounts(
    @Query()
    integrationAccountsRequestBody: IntegrationAccountsRequestBody,
  ): Promise<IntegrationAccount[]> {
    return await this.integrationAccountService.getIntegrationAccountsForWorkspace(
      integrationAccountsRequestBody.workspaceId,
    );
  }

  @Get(':integrationAccountId')
  @UseGuards(new AuthGuard())
  async getIntegrationAccount(
    @Param()
    integrationAccountIdRequestIdBody: IntegrationAccountRequestIdBody,
  ): Promise<IntegrationAccount> {
    return await this.integrationAccountService.getIntegrationAccountWithId(
      integrationAccountIdRequestIdBody,
    );
  }

  @Post('check')
  @UseGuards(new AuthGuard())
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

  @Post(':integrationAccountId')
  @UseGuards(new AuthGuard())
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
  @UseGuards(new AuthGuard())
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
      createIntegrationAccountBody.accountIdentifier,
    );
  }

  @Post('link/:linkId')
  async createIntegrationAccountWithLink(
    @Param()
    integrationAccountWithLinkRequestIdBody: IntegrationAccountWithLinkRequestIdBody,
    @Body()
    createIntegrationAccountBody: CreateIntegrationAccountWithLinkBody,
  ): Promise<IntegrationAccount> {
    const link = await this.linkService.getLink(
      integrationAccountWithLinkRequestIdBody,
    );

    if (link.expired) {
      throw new BadRequestException('Link has expired');
    }

    return await this.integrationAccountService.createIntegrationAccountWithLink(
      createIntegrationAccountBody.integrationDefinitionId,
      createIntegrationAccountBody.config,
      createIntegrationAccountBody.integrationAccountName,
      createIntegrationAccountBody.authType,
      link.workspaceId,
      link.linkId,
      createIntegrationAccountBody.accountIdentifier,
    );
  }

  @All(':integrationAccountId/proxy/*')
  @UseGuards(new AuthGuard())
  async proxyPost(
    @Body()
    body: any,
    @Query()
    query: any,
    @Req() request: Request,
    @Param()
    integrationAccountIdRequestIdBody: any,
  ): Promise<any> {
    return await this.integrationAccountService.runProxyCommand(
      integrationAccountIdRequestIdBody.integrationAccountId,
      body,
      request.method,
      integrationAccountIdRequestIdBody['0'],
      query,
    );
  }
}
