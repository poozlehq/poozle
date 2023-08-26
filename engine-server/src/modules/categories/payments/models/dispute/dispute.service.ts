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
  DisputeQueryParams,
  DISPUTE_KEYS,
  GetDisputeQueryParams,
  PathParamsWithDisputeId,
} from './dispute.interface';
import { CHARGE_KEYS } from '../charge/charge.interface';
import { Dispute } from '@poozle/engine-idk';

const DATABASE_NAME = 'payments_dispute';
const CHARGE_DATABASE_NAME = 'payments_charge';
@Injectable()
export class DisputeService {
  constructor(private dataService: DataService) {}

  async getDisputes(
    integrationAccount: IntegrationAccount,
    query: DisputeQueryParams,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getDisputesForRealtime(integrationAccount, query);
    }

    return await this.getDisputesFromDb(integrationAccount, query);
  }

  async getDispute(
    integrationAccount: IntegrationAccount,
    query: GetDisputeQueryParams,
    params: PathParamsWithDisputeId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getDisputeForRealtime(
        integrationAccount,
        query,
        params,
      );
    }

    return await this.getDisputeFromDb(integrationAccount, query, params);
  }

  async getListFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: DisputeQueryParams,
  ) {
    const { offset, limit, page } = pagination(
      queryParams.limit,
      queryParams.cursor,
    );

    const selectedKeys = SELECT_KEYS.map(
      (key) => `${DATABASE_NAME}.${key} as ${key}`,
    );

    const joinTable = {
      tableName: CHARGE_DATABASE_NAME,
      joinColumn: 'id',
      sourceColumn: 'charge_id',
      selectedKeys: CHARGE_KEYS,
      selectedColumnName: 'charge',
    };

    let query = getBaseQuery<Dispute>(
      workspaceName,
      table,
      where,
      selectedKeys,
      queryParams.raw,
      joinTable,
    );

    query = applyDateFilter(query, queryParams, DATABASE_NAME);

    // TODO (harshith): Pass knex builder T
    const data = (await query.limit(limit).offset(offset)) as any;

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async getDisputesFromDb(
    integrationAccount: IntegrationAccount,
    query: DisputeQueryParams,
  ) {
    let where: Record<string, any> = {
      [`${DATABASE_NAME}.integration_account_id`]:
        integrationAccount.integrationAccountId,
      ...(query.reason ? { [`${DATABASE_NAME}.reason`]: query.reason } : {}),
      ...(query.status ? { [`${DATABASE_NAME}.status`]: query.status } : {}),
    };

    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      where,
      DISPUTE_KEYS,
      query,
    );
  }

  async getDisputeFromDb(
    integrationAccount: IntegrationAccount,
    query: GetDisputeQueryParams,
    params: PathParamsWithDisputeId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.dispute_id,
      },
      DISPUTE_KEYS,
      query.raw,
    );
  }

  async getDisputeForRealtime(
    integrationAccount: IntegrationAccount,
    query: GetDisputeQueryParams,
    params: PathParamsWithDisputeId,
  ) {
    const disputeResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/disputes/${params.dispute_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { raw: query.raw },
      params,
    );

    return disputeResponse;
  }

  async getDisputesForRealtime(
    integrationAccount: IntegrationAccount,
    query: DisputeQueryParams,
  ) {
    const disputeResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/disputes',
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

    return disputeResponse;
  }
}
