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
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithPageId,
  ListPagesQueryParams,
  PageResponse,
  PagesResponse,
  CommonPageQueryParams,
  CreatePageBody,
} from './page.interface';
import { PageService } from './page.service';

@Controller({
  version: '1',
  path: 'documentation',
})
@ApiTags('Documentation')
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
export class PageController {
  constructor(private pageService: PageService) {}

  /**
   * Get all pages
   */
  @Get('pages')
  async getPages(
    @Query() query: ListPagesQueryParams,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<PagesResponse> {
    return this.pageService.getPages(query, integrationAccount);
  }

  /**
   * Get a single page
   */
  @Get('pages/:page_id')
  async getPageId(
    @Query() query: CommonPageQueryParams,
    @Param()
    params: PathParamsWithPageId,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    return this.pageService.getPageId(query, params, integrationAccount);
  }

  /**
   * Create a page
   */
  @Post('pages')
  async createPage(
    @Query() query: CommonPageQueryParams,
    @Body() createPageBody: CreatePageBody,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    return this.pageService.createPage(
      query,
      createPageBody,
      integrationAccount,
    );
  }
}
