/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Query, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  PathParams,
  PathParamsWithUserId,
  ListUserParams,
  GetUserParams,
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

  @Get(':collection_id/users/:user_id')
  async getUserId(
    @Query() query: GetUserParams = defaultQueryParams,
    @Param()
    params: PathParamsWithUserId,
    @Headers() headers: HeadersType,
  ): Promise<TicketingUserResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const userResponse = await getDataFromAccount(
      integrationAccount,
      '/users',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse;
  }

  @Get(':collection_id/users')
  async getUsers(
    @Query() query: ListUserParams = defaultQueryParams,
    @Param()
    params: PathParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingUsersResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const userResponse = await getDataFromAccount(
      integrationAccount,
      '/collections',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse as TicketingUsersResponse;
  }
}
