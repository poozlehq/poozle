/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';
import { DataService } from 'modules/data/data.service';

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
  constructor(private dataService: DataService) {}

  @Get(':collection_id/users/:user_id')
  async getUserId(
    @Query() query: GetUserParams,
    @Param()
    params: PathParamsWithUserId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingUserResponse> {
    const userResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/users/${params.user_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse;
  }

  @Get(':collection_id/users')
  async getUsers(
    @Query() query: ListUserParams,
    @Param()
    params: PathParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingUsersResponse> {
    const userResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/users',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return userResponse as TicketingUsersResponse;
  }
}
