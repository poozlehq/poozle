/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  DisputeQueryParams,
  GetDisputeQueryParams,
  PathParamsWithDisputeId,
  DisputeResponse,
  DisputesResponse,
} from './dispute.interface';
import { DisputeService } from './dispute.service';

@Controller({
  version: '1',
  path: 'payments/disputes',
})
@ApiTags('Payments')
export class DisputeController {
  constructor(private disputeService: DisputeService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getDisputes(
    @Query() query: DisputeQueryParams,
    @GetIntegrationAccount(IntegrationType.PAYMENTS)
    integrationAccount: IntegrationAccount,
  ): Promise<DisputesResponse> {
    const disputeResponse = await this.disputeService.getDisputes(
      integrationAccount,
      query,
    );

    return disputeResponse;
  }

  @Get(':dispute_id')
  async getDispute(
    @Query() query: GetDisputeQueryParams,
    @Param()
    params: PathParamsWithDisputeId,
    @GetIntegrationAccount(IntegrationType.PAYMENTS)
    integrationAccount: IntegrationAccount,
  ): Promise<DisputeResponse> {
    const disputeResponse = await this.disputeService.getDispute(
      integrationAccount,
      query,
      params,
    );

    return disputeResponse;
  }
}
