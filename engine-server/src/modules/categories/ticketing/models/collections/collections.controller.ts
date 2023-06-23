/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { runIntegrationCommand } from 'shared/integration_run_utils';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';
import { QueryParams } from 'common/interfaces/query.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  CollectionQueryParams,
  TicketingCollectionsResponse,
} from './collections.interface';

@Controller({
  version: '1',
  path: 'ticketing/collections',
})
@ApiTags('Ticketing')
export class CollectionsController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  async getCollectionsForAccount(
    integrationAccount: IntegrationAccount,
    queryParams: QueryParams = defaultQueryParams,
  ) {
    return await runIntegrationCommand(
      integrationAccount.integrationDefinition?.sourceUrl,
      '/collections',
      'GET',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      integrationAccount.integrationConfiguration as any,
      integrationAccount.authType,
      {
        queryParams,
      },
    );
  }

  @Get()
  async getCollections(
    @Query() query: CollectionQueryParams = defaultQueryParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingCollectionsResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const collectionResponse = await this.getCollectionsForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
    );

    return collectionResponse;
  }
}
