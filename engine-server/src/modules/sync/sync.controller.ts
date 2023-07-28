/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IntegrationAccountRequestIdBody } from 'modules/integration_account/integration_account.interface';

import { SyncService } from './sync.service';

@Controller({
  version: '1',
  path: 'sync',
})
@ApiTags('Sync')
export class SyncController {
  constructor(private syncService: SyncService) {}

  @Get(':integrationAccountId')
  async getSyncSchedule(
    @Param()
    integrationAccountIdRequestIdBody: IntegrationAccountRequestIdBody,
  ) {
    return await this.syncService.getSyncSchedule(
      integrationAccountIdRequestIdBody.integrationAccountId,
    );
  }

  @Get(':integrationAccountId/jobs')
  async getJobs(
    @Param()
    integrationAccountIdRequestIdBody: IntegrationAccountRequestIdBody,
  ) {
    return await this.syncService.getJobs(
      integrationAccountIdRequestIdBody.integrationAccountId,
    );
  }
}
