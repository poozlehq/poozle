/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { Method } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import {
  applyDateFilter,
  getBaseQuery,
  getMetaParams,
  getObjectFromDb,
} from 'common/knex';
import { pagination } from 'common/utils';

import { DataService } from 'modules/data/data.service';

import {
  COLLECTION_KEYS,
  CollectionQueryParams,
  GetCollectionQueryParams,
  PathParamsWithCollectionId,
} from './collection.interface';

const DATABASE_NAME = 'ticketing_collection';

@Injectable()
export class CollectionService {
  constructor(private dataService: DataService) {}

  async getCollections(
    integrationAccount: IntegrationAccount,
    query: CollectionQueryParams,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getCollectionsForRealtime(integrationAccount, query);
    }

    return await this.getCollectionsFromDb(integrationAccount, query);
  }

  async getCollection(
    integrationAccount: IntegrationAccount,
    query: GetCollectionQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getCollectionForRealtime(
        integrationAccount,
        query,
        params,
      );
    }

    return await this.getCollectionFromDb(integrationAccount, query, params);
  }

  async getListFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: CollectionQueryParams,
  ) {
    const { offset, limit, page } = pagination(
      queryParams.limit,
      queryParams.cursor,
    );

    let query = getBaseQuery(
      workspaceName,
      table,
      where,
      SELECT_KEYS,
      queryParams.raw,
    );

    query = applyDateFilter(query, queryParams, DATABASE_NAME);

    const data = await query.limit(limit).offset(offset);

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async getCollectionsFromDb(
    integrationAccount: IntegrationAccount,
    query: CollectionQueryParams,
  ) {
    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
      },
      COLLECTION_KEYS,
      query,
    );
  }

  async getCollectionFromDb(
    integrationAccount: IntegrationAccount,
    query: GetCollectionQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.collection_id,
      },
      COLLECTION_KEYS,
      query.raw,
    );
  }

  async getCollectionForRealtime(
    integrationAccount: IntegrationAccount,
    query: GetCollectionQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    const collectionResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/collections/${params.collection_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { raw: query.raw },
      params,
    );

    return collectionResponse;
  }

  async getCollectionsForRealtime(
    integrationAccount: IntegrationAccount,
    query: CollectionQueryParams,
  ) {
    const collectionResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/collections',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {
        limit: query.limit,
        cursor: query.cursor,
        raw: query.raw,
        created_after: query.created_after,
        created_before: query.created_before,
      },
      {},
    );

    return collectionResponse;
  }
}
