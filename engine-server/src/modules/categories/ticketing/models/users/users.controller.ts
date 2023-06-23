/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Query, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { runIntegrationCommand } from 'shared/integration_run_utils';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';
import { QueryParams } from 'common/interfaces/query.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  PathParams,
  PathParamsWithUserId,
  UserParams,
  TicketingUserResponse,
  TicketingUsersResponse,
} from './users.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class UsersController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  async getUsersForAccount(
    integrationAccount: IntegrationAccount,
    queryParams: QueryParams,
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

  @Get(':collection_id/users/:user_id')
  async getUserId(
    @Query() query: UserParams = defaultQueryParams,
    @Param()
    params: PathParamsWithUserId,
    @Headers() headers: HeadersType,
  ): Promise<TicketingUserResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const userResponse = await this.getUsersForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse;
  }

  @Get(':collection_id/users')
  async getUsers(
    @Query() query: UserParams = defaultQueryParams,
    @Param()
    params: PathParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingUsersResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const userResponse = await this.getUsersForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse as TicketingUsersResponse;
  }
}
