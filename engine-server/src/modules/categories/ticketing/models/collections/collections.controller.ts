/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  CollectionQueryParams,
  GetCollectionQueryParams,
  PathParamsWithCollectionId,
  TicketingCollectionResponse,
  TicketingCollectionsResponse,
} from './collections.interface';

@Controller({
  version: '1',
  path: 'ticketing/collections',
})
@ApiTags('Ticketing')
export class CollectionsController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  @Get()
  async getCollections(
    @Query() query: CollectionQueryParams = defaultQueryParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingCollectionsResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const collectionResponse = await getDataFromAccount(
      integrationAccount,
      '/collections',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      {},
    );

    return collectionResponse;
  }

  @Get(':collection_id')
  async getCollection(
    @Query() query: GetCollectionQueryParams,
    @Param()
    params: PathParamsWithCollectionId,
    @Headers() headers: HeadersType,
  ): Promise<TicketingCollectionResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const collectionResponse = await getDataFromAccount(
      integrationAccount,
      '/collections',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      params,
    );

    return collectionResponse;
  }
}
