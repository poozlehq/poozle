/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithThreadId,
  ListThreadsQueryParams,
  MailThreadResponse,
  MailThreadsResponse,
} from './thread.interface';

@Controller({
  version: '1',
  path: 'mail',
})
@ApiTags('Mail')
@UseGuards(new AuthGuard())
export class ThreadsController {
  @Get('threads')
  async getThreads(
    @Query() query: ListThreadsQueryParams,

    @GetIntegrationAccount(IntegrationType.MAIL)
    integrationAccount: IntegrationAccount,
  ): Promise<MailThreadsResponse> {
    const threadsResponse = await getDataFromAccount(
      integrationAccount,
      '/threads',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {},
    );

    return threadsResponse;
  }

  @Get('threads/:thread_id')
  async getThreadId(
    @Query() query: ListThreadsQueryParams,
    @Param()
    params: PathParamsWithThreadId,
    @GetIntegrationAccount(IntegrationType.MAIL)
    integrationAccount: IntegrationAccount,
  ): Promise<MailThreadResponse> {
    const threadResponse = await getDataFromAccount(
      integrationAccount,
      `/threads/${params.thread_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return threadResponse;
  }
}
