/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';

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
} from './collection.interface';
import { CollectionService } from './collection.service';

@Controller({
  version: '1',
  path: 'ticketing/collections',
})
@ApiTags('Ticketing')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getCollections(
    @Query() query: CollectionQueryParams = defaultQueryParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCollectionsResponse> {
    const collectionResponse = await this.collectionService.getCollections(
      integrationAccount,
      query,
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
    const collectionResponse = await this.collectionService.getCollection(
      integrationAccount,
      query,
      params,
    );

    return collectionResponse;
  }
}
