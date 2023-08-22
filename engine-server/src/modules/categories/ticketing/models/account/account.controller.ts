/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  AccountQueryParams,
  GetAccountQueryParams,
  PathParamsWithAccountId,
  TicketingAccountResponse,
  TicketingAccountsResponse,
} from './account.interface';
import { AccountService } from './account.service';

@Controller({
  version: '1',
  path: 'ticketing/accounts',
})
@ApiTags('Ticketing')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getAccounts(
    @Query() query: AccountQueryParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingAccountsResponse> {
    const accountResponse = await this.accountService.getAccounts(
      integrationAccount,
      query,
    );

    return accountResponse;
  }

  @Get(':account_id')
  async getAccount(
    @Query() query: GetAccountQueryParams,
    @Param()
    params: PathParamsWithAccountId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingAccountResponse> {
    const accountResponse = await this.accountService.getAccount(
      integrationAccount,
      query,
      params,
    );

    return accountResponse;
  }
}
