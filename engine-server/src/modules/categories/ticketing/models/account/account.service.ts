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
  ACCOUNT_KEYS,
  AccountQueryParams,
  GetAccountQueryParams,
  PathParamsWithAccountId,
} from './account.interface';

const DATABASE_NAME = 'ticketing_account';

@Injectable()
export class AccountService {
  constructor(private dataService: DataService) {}

  async getAccounts(
    integrationAccount: IntegrationAccount,
    query: AccountQueryParams,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getAccountsForRealtime(integrationAccount, query);
    }

    return await this.getAccountsFromDb(integrationAccount, query);
  }

  async getAccount(
    integrationAccount: IntegrationAccount,
    query: GetAccountQueryParams,
    params: PathParamsWithAccountId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getAccountForRealtime(
        integrationAccount,
        query,
        params,
      );
    }

    return await this.getAccountFromDb(integrationAccount, query, params);
  }

  async getListFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: AccountQueryParams,
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

    query = applyDateFilter(query, queryParams);

    const data = await query.limit(limit).offset(offset);

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async getAccountsFromDb(
    integrationAccount: IntegrationAccount,
    query: AccountQueryParams,
  ) {
    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
      },
      ACCOUNT_KEYS,
      query,
    );
  }

  async getAccountFromDb(
    integrationAccount: IntegrationAccount,
    query: GetAccountQueryParams,
    params: PathParamsWithAccountId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.account_id,
      },
      ACCOUNT_KEYS,
      query.raw,
    );
  }

  async getAccountForRealtime(
    integrationAccount: IntegrationAccount,
    query: GetAccountQueryParams,
    params: PathParamsWithAccountId,
  ) {
    const accountResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/accounts/${params.account_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { raw: query.raw },
      params,
    );

    return accountResponse;
  }

  async getAccountsForRealtime(
    integrationAccount: IntegrationAccount,
    query: AccountQueryParams,
  ) {
    const accountResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/accounts',
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

    return accountResponse;
  }
}
