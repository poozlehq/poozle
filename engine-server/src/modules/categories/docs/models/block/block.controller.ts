/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithBlockId,
  ListBlocksQueryParams,
  BlocksResponse,
} from './block.interface';

@Controller({
  version: '1',
  path: 'docs',
})
@ApiTags('Docs')
@UseGuards(new AuthGuard())
export class BlockController {
  @Get('blocks/:block_id')
  async getBlocks(
    @Query() query: ListBlocksQueryParams,
    @Param()
    params: PathParamsWithBlockId,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks/${params.block_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {},
    );

    return blocksResponse;
  }

  @Post('blocks/:block_id')
  async createBlocks(
    @Query() query: ListBlocksQueryParams,
    @Param()
    params: PathParamsWithBlockId,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks/${params.block_id}`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return blocksResponse;
  }

  @Post('blocks/:block_id')
  async updateBlock(
    @Query() query: ListBlocksQueryParams,
    @Param()
    params: PathParamsWithBlockId,
    @GetIntegrationAccount(IntegrationType.DOCS)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks/${params.block_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return blocksResponse;
  }
}
