/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithParentId,
  PathParamsWithBlockId,
  ListBlocksQueryParams,
  BlocksResponse,
  CommonBlockQueryParams,
  CreatePageBody,
  UpdatePageBody,
} from './block.interface';

@Controller({
  version: '1',
  path: 'documentation',
})
@ApiTags('Documentation')
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
@UseGuards(new AuthGuard())
export class BlockController {
  /**
   * Get all the block for a specific parent_id
   */
  @Get(':parent_id/blocks')
  async getBlocks(
    @Query() query: ListBlocksQueryParams,
    @Param()
    params: PathParamsWithParentId,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return blocksResponse;
  }

  /**
   * Create a block in a parent block
   */
  @Post(':parent_id/blocks')
  async createBlocks(
    @Query() query: CommonBlockQueryParams,
    @Param()
    params: PathParamsWithParentId,
    @Body()
    createPageBody: CreatePageBody,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
      createPageBody,
    );

    return blocksResponse;
  }

  /**
   * Update the block with a specific Id
   */
  @Patch('blocks/:block_id')
  async updateBlock(
    @Query() query: CommonBlockQueryParams,
    @Param()
    params: PathParamsWithBlockId,
    @Body()
    updatePageBody: UpdatePageBody,
    @GetIntegrationAccount(IntegrationType.DOCUMENTATION)
    integrationAccount: IntegrationAccount,
  ): Promise<BlocksResponse> {
    const blocksResponse = await getDataFromAccount(
      integrationAccount,
      `/blocks/${params.block_id}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
      updatePageBody,
    );

    return blocksResponse;
  }
}
