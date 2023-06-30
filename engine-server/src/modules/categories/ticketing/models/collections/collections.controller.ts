/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

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
  @Get()
  @UseGuards(new AuthGuard())
  async getCollections(
    @Query() query: CollectionQueryParams = defaultQueryParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCollectionsResponse> {
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
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCollectionResponse> {
    const collectionResponse = await getDataFromAccount(
      integrationAccount,
      `/collections/${params.collection_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      params,
    );

    return collectionResponse;
  }
}
