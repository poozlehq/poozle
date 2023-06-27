/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { HeadersType } from 'common/interfaces/headers.interface';

import { AuthGuard } from 'modules/auth/auth.guard';
import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

import {
  PathParams,
  PathParamsWithTicketId,
  ListTicketsQueryParams,
  TicketingTicketResponse,
  TicketingTicketsResponse,
  GetTicketQueryParams,
} from './tickets.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
@UseGuards(new AuthGuard())
export class TicketsController {
  constructor(private integrationAccountService: IntegrationAccountService) {}

  @Get(':collection_id/tickets/:ticket_id')
  async getTicketId(
    @Query() query: GetTicketQueryParams = defaultQueryParams,
    @Param()
    params: PathParamsWithTicketId,
    @Headers() headers: HeadersType,
  ): Promise<TicketingTicketResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const ticketResponse = await getDataFromAccount(
      integrationAccount,
      '/tickets',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketResponse;
  }

  @Get(':collection_id/tickets')
  async getTickets(
    @Query() query: ListTicketsQueryParams = defaultQueryParams,
    @Param()
    params: PathParams,
    @Headers() headers: HeadersType,
  ): Promise<TicketingTicketsResponse> {
    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: headers.workspaceId,
          integrationAccountName: headers.integrationAccountName,
          integrationType: IntegrationType.TICKETING,
        },
      )) as IntegrationAccount;

    const ticketsResponse = await getDataFromAccount(
      integrationAccount,
      '/tickets',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketsResponse;
  }
}
