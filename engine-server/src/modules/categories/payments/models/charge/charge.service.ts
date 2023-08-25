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
  CHARGE_KEYS,
  ChargeQueryParams,
  GetChargeQueryParams,
  PathParamsWithChargeId,
} from './charge.interface';

const DATABASE_NAME = 'payments_charge';

@Injectable()
export class ChargeService {
  constructor(private dataService: DataService) {}

  async getCharges(
    integrationAccount: IntegrationAccount,
    query: ChargeQueryParams,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getChargesForRealtime(integrationAccount, query);
    }

    return await this.getChargesFromDb(integrationAccount, query);
  }

  async getCharge(
    integrationAccount: IntegrationAccount,
    query: GetChargeQueryParams,
    params: PathParamsWithChargeId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getChargeForRealtime(integrationAccount, query, params);
    }

    return await this.getChargeFromDb(integrationAccount, query, params);
  }

  async getListFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: ChargeQueryParams,
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

    // TODO (harshith): fix the knex builder
    const data = (await query.limit(limit).offset(offset)) as any[];

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async getChargesFromDb(
    integrationAccount: IntegrationAccount,
    query: ChargeQueryParams,
  ) {
    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
      },
      CHARGE_KEYS,
      query,
    );
  }

  async getChargeFromDb(
    integrationAccount: IntegrationAccount,
    query: GetChargeQueryParams,
    params: PathParamsWithChargeId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.charge_id,
      },
      CHARGE_KEYS,
      query.raw,
    );
  }

  async getChargeForRealtime(
    integrationAccount: IntegrationAccount,
    query: GetChargeQueryParams,
    params: PathParamsWithChargeId,
  ) {
    const chargeResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/charges/${params.charge_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { raw: query.raw },
      params,
    );

    return chargeResponse;
  }

  async getChargesForRealtime(
    integrationAccount: IntegrationAccount,
    query: ChargeQueryParams,
  ) {
    const chargeResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/charges',
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

    return chargeResponse;
  }
}
