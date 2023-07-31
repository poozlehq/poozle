/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Method } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { DataService } from 'modules/data/data.service';

import {
  BlocksResponse,
  CommonBlockQueryParams,
  CreatePageBody,
  ListBlocksQueryParams,
  PathParamsWithBlockId,
  PathParamsWithParentId,
  UpdatePageBody,
} from './block.interface';

@Injectable()
export class BlockService {
  constructor(private dataService: DataService) {}

  async getBlocks(
    query: ListBlocksQueryParams,
    params: PathParamsWithParentId,
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/blocks`,
      Method.GET,
      query,
      params,
    );

    return blocksResponse;
  }

  async createBlocks(
    query: CommonBlockQueryParams,
    params: PathParamsWithParentId,
    createPageBody: CreatePageBody,
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/blocks`,
      Method.POST,
      query,
      params,
      createPageBody,
    );

    return blocksResponse;
  }

  async updateBlock(
    query: CommonBlockQueryParams,
    params: PathParamsWithBlockId,
    updatePageBody: UpdatePageBody,
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/blocks/${params.block_id}`,
      Method.PATCH,
      query,
      params,
      updatePageBody,
    );

    return blocksResponse;
  }
}
