/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  ChargeQueryParams,
  GetChargeQueryParams,
  PathParamsWithChargeId,
  ChargeResponse,
  ChargesResponse,
} from './charge.interface';
import { ChargeService } from './charge.service';

@Controller({
  version: '1',
  path: 'payments/charges',
})
@ApiTags('Payments')
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getCharges(
    @Query() query: ChargeQueryParams,
    @GetIntegrationAccount(IntegrationType.PAYMENTS)
    integrationAccount: IntegrationAccount,
  ): Promise<ChargesResponse> {
    const chargeResponse = await this.chargeService.getCharges(
      integrationAccount,
      query,
    );

    return chargeResponse;
  }

  @Get(':charge_id')
  async getCharge(
    @Query() query: GetChargeQueryParams,
    @Param()
    params: PathParamsWithChargeId,
    @GetIntegrationAccount(IntegrationType.PAYMENTS)
    integrationAccount: IntegrationAccount,
  ): Promise<ChargeResponse> {
    const chargeResponse = await this.chargeService.getCharge(
      integrationAccount,
      query,
      params,
    );

    return chargeResponse;
  }
}
