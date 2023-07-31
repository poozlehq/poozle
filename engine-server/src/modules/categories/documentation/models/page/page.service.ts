/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Method } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { DataService } from 'modules/data/data.service';

import {
  PathParamsWithPageId,
  ListPagesQueryParams,
  PageResponse,
  PagesResponse,
  CommonPageQueryParams,
  CreatePageBody,
} from './page.interface';

@Injectable()
export class PageService {
  constructor(private dataService: DataService) {}

  async getPages(
    query: ListPagesQueryParams,
    integrationAccount: IntegrationAccount,
  ): Promise<PagesResponse> {
    const pageResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/pages',
      Method.GET,
      query,
      {},
    );

    return pageResponse;
  }

  async getPageId(
    query: CommonPageQueryParams,
    params: PathParamsWithPageId,
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    const pageResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/pages/${params.page_id}`,
      Method.GET,
      query,
      params,
    );

    return pageResponse;
  }

  async createPage(
    query: CommonPageQueryParams,
    createPageBody: CreatePageBody,
    integrationAccount: IntegrationAccount,
  ): Promise<PageResponse> {
    const pageResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/pages`,
      Method.POST,
      query,
      {},
      createPageBody,
    );

    return pageResponse;
  }
}
