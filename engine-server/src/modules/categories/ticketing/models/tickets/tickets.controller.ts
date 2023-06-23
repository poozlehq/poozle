/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { runIntegrationCommand } from 'shared/integration_run_utils';

import { IntegrationAccount } from '@@generated/integrationAccount.entity';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';
import { QueryParams } from 'common/interfaces/query.interface';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  PathParams,
  PathParamsWithTicketId,
  TicketsQueryParams,
  TicketingTicketResponse,
  TicketingTicketsResponse,
} from './tickets.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class TicketsController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  async getTicketsForAccount(
    integrationAccount: IntegrationAccount,
    queryParams: QueryParams = defaultQueryParams,
    pathParams: Record<string, string>,
  ) {
    return await runIntegrationCommand(
      integrationAccount.integrationDefinition?.sourceUrl,
      '/tickets',
      'GET',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      integrationAccount.integrationConfiguration as any,
      integrationAccount.authType,
      {
        queryParams,
        pathParams,
      },
    );
  }

  @Get(':collection_id/tickets/:ticket_id')
  async getTicketId(
    @Query() query: TicketsQueryParams = defaultQueryParams,
    @Param()
    params: PathParamsWithTicketId,
    @Headers() headers: HeadersType,
  ): Promise<TicketingTicketResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const ticketResponse = await this.getTicketsForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketResponse;
  }

  @Get(':collection_id/tickets')
  async getTickets(
    @Query() query: TicketsQueryParams = defaultQueryParams,
    @Param()
    params: PathParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingTicketsResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccount({
        workspaceId: headers.workspaceId,
        integrationAccountName: headers.integrationAccountName,
      })) as IntegrationAccount;

    const ticketsResponse = await this.getTicketsForAccount(
      integrationAccount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketsResponse;
  }
}
