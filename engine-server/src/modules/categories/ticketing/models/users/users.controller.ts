/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Query, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { runIntegrationCommand } from 'shared/integration_run_utils';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import { HeadersType } from 'common/interfaces/headers.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import { PathParams, UserParams } from './users.interface';
import { TicketingController } from '../../ticketing.controller';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class UsersController extends TicketingController {
  constructor(private integrationAccountService: IntegrationAccountService) {
    super();
  }

  async getUsersForAccount(
    integrationAccount: IntegrationAccount,
    queryParams: Record<string, string>,
    pathParams: Record<string, string>,
  ) {
    return await runIntegrationCommand(
      integrationAccount.integrationDefinition?.sourceUrl,
      '/users',
      'GET',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      integrationAccount.integrationConfiguration as any,
      integrationAccount.authType,
      {
        queryParams,
        pathParams,
      },
    );
  }

  @Get([':collection_id/users', ':collection_id/users/:user_id'])
  async getUsers(
    @Query() query: UserParams,
    @Param()
    params: PathParams,
    @Headers() headers: HeadersType,
  ) {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const userResponse = await this.getUsersForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse;
  }
}
