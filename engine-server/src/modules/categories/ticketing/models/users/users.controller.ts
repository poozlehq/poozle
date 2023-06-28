/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

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
@UseGuards(new AuthGuard())
export class UsersController {
  @Get(':collection_id/users/:user_id')
  async getUserId(
    @Query() query: GetUserParams = defaultQueryParams,
    @Param()
    params: PathParamsWithUserId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingUserResponse> {
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
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingUsersResponse> {
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
