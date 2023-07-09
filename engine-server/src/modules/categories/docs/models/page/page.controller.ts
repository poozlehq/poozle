/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithPageId,
  ListPagesQueryParams,
  PageResponse,
  PagesResponse,
  CommonPageQueryParams,
  CreatePageBody,
} from './page.interface';

@Controller({
  version: '1',
  path: 'docs',
})
@ApiTags('Docs')
@UseGuards(new AuthGuard())
export class PageController {
  @Get('pages')
  async getPages(
    @Query() query: ListPagesQueryParams,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<PagesResponse> {
    const pageResponse = await getDataFromAccount(
      integrationAccount,
      '/pages',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {},
    );

    return pageResponse;
  }

  @Get('pages/:page_id')
  async getPageeId(
    @Query() query: CommonPageQueryParams,
    @Param()
    params: PathParamsWithPageId,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    const pageResponse = await getDataFromAccount(
      integrationAccount,
      `/pages/${params.page_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return pageResponse;
  }

  @Post('messages')
  async createPage(
    @Query() query: CommonPageQueryParams,

    @Body() createPageBody: CreatePageBody,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    const pageResponse = await getDataFromAccount(
      integrationAccount,
      `/pages`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      {},
      createPageBody,
    );

    return pageResponse;
  }
}
