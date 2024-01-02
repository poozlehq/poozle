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
  CommonTicketQueryParams,
  CreateTicketBody,
  GetTicketsQueryParams,
  ListTicketsQueryParams,
  PathParamsWithCollectionId,
  PathParamsWithTicketId,
  TICKET_KEYS,
  Ticket,
  TicketingTicketResponse,
  TicketingTicketsResponse,
  UpdateTicketBody,
} from './tickets.interface';

const DATABASE_NAME = 'ticketing_ticket';

@Injectable()
export class TicketService {
  constructor(private dataService: DataService) {}

  async getTickets(
    integrationAccount: IntegrationAccount,
    query: ListTicketsQueryParams,
  ) {
    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
      },
      TICKET_KEYS,
      query,
    );
  }

  async getCollectionTickets(
    integrationAccount: IntegrationAccount,
    query: ListTicketsQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getTicketsForRealtime(
        integrationAccount,
        query,
        params,
      );
    }

    return await this.getTicketsFromDb(integrationAccount, query, params);
  }

  async getTicket(
    integrationAccount: IntegrationAccount,
    query: GetTicketsQueryParams,
    params: PathParamsWithTicketId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getTicketForRealtime(integrationAccount, query, params);
    }

    return await this.getTicketFromDb(integrationAccount, query, params);
  }

  async getListFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: ListTicketsQueryParams,
  ): Promise<TicketingTicketsResponse> {
    const { offset, limit, page } = pagination(
      queryParams.limit,
      queryParams.cursor,
    );

    let query = getBaseQuery<Ticket>(
      workspaceName,
      table,
      where,
      SELECT_KEYS,
      queryParams.raw,
    );

    query = applyDateFilter(query, queryParams, DATABASE_NAME);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await query.limit(limit).offset(offset)) as any[];

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async getTicketsFromDb(
    integrationAccount: IntegrationAccount,
    query: ListTicketsQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    return await this.getListFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        collection_id: params.collection_id,
      },
      TICKET_KEYS,
      query,
    );
  }

  async getTicketFromDb(
    integrationAccount: IntegrationAccount,
    query: GetTicketsQueryParams,
    params: PathParamsWithTicketId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.ticket_id,
        collection_id: params.collection_id,
      },
      TICKET_KEYS,
      query.raw,
    );
  }

  async getTicketsForRealtime(
    integrationAccount: IntegrationAccount,
    query: GetTicketsQueryParams,
    params: PathParamsWithCollectionId,
  ) {
    const ticketsResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/tickets',
      Method.GET,
      {
        limit: query.limit,
        cursor: query.cursor,
        raw: query.raw,
        created_after: query.created_after,
        created_before: query.created_before,
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketsResponse;
  }

  async getTicketForRealtime(
    integrationAccount: IntegrationAccount,
    query: ListTicketsQueryParams,
    params: PathParamsWithTicketId,
  ) {
    const ticketResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/tickets/${params.ticket_id}`,
      Method.GET,

      { raw: query.raw },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketResponse;
  }

  async patchTicket(
    query: CommonTicketQueryParams,

    params: PathParamsWithTicketId,
    updateTicketBody: UpdateTicketBody,

    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/tickets/${params.ticket_id}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      updateTicketBody,
    );

    return ticketResponse;
  }

  async createTicket(
    query: CommonTicketQueryParams,
    params: PathParamsWithCollectionId,
    createTicketBody: CreateTicketBody,
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/tickets`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      createTicketBody,
    );

    console.log('ticketResponse: ', ticketResponse);

    return ticketResponse;
  }

  async getTicketTypes(
    query: CommonTicketQueryParams,
    params: PathParamsWithCollectionId,
    integrationAccount: IntegrationAccount,
  ): Promise<{}> {
    const ticketResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/tickets/types`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return ticketResponse;
  }
}
