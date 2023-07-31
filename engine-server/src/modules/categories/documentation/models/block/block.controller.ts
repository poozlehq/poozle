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

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

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
import { BlockService } from './block.service';

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
  constructor(private blockService: BlockService) {}

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
    return this.blockService.getBlocks(query, params, integrationAccount);
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
    return this.blockService.createBlocks(
      query,
      params,
      createPageBody,
      integrationAccount,
    );
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
    return this.blockService.updateBlock(
      query,
      params,
      updatePageBody,
      integrationAccount,
    );
  }
}
