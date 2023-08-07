/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  CommonMessageQueryParams,
  FreeBusyBody,
  FreeBusyResponse,
} from './calendars.interface';

@Controller({
  version: '1',
  path: 'calendar',
})
@ApiTags('Calendar')
@UseGuards(new AuthGuard())
@ApiBadRequestResponse({
  status: 400,
  type: 'string',
  description: 'Bad Request',
})
@ApiUnauthorizedResponse({
  status: 401,
  type: 'string',
  description: 'Not authorised',
})
export class CalendarController {
  @Post('free-busy')
  async freebusy(
    @Query() query: CommonMessageQueryParams,

    @Body() FreeBusyBody: FreeBusyBody,
    @GetIntegrationAccount(IntegrationType.CALENDAR)
    integrationAccount: IntegrationAccount,
  ): Promise<FreeBusyResponse> {
    const freeBusyResponse = await getDataFromAccount(
      integrationAccount,
      `/free-busy`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      {},
      FreeBusyBody,
    );

    return freeBusyResponse;
  }

  @Post('availability')
  async availability(
    @Query() query: CommonMessageQueryParams,

    @Body() AvailablityBody: FreeBusyBody,
    @GetIntegrationAccount(IntegrationType.CALENDAR)
    integrationAccount: IntegrationAccount,
  ): Promise<FreeBusyResponse> {
    const availabilityResponse = await getDataFromAccount(
      integrationAccount,
      `/availability`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      {},
      AvailablityBody,
    );

    return availabilityResponse;
  }
}
