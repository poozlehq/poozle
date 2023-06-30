/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParams,
  PathParamsWithTicketId,
  ListTicketsQueryParams,
  TicketingTicketResponse,
  TicketingTicketsResponse,
  CommonTicketQueryParams,
  UpdateTicketBody,
  CreateTicketBody,
} from './tickets.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
@UseGuards(new AuthGuard())
export class TicketsController {
  @Get(':collection_id/tickets')
  async getTickets(
    @Query() query: ListTicketsQueryParams,
    @Param()
    params: PathParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketsResponse> {
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

  @Get(':collection_id/tickets/:ticket_id')
  async getTicketId(
    @Query() query: ListTicketsQueryParams,
    @Param()
    params: PathParamsWithTicketId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await getDataFromAccount(
      integrationAccount,
      `/tickets/${params.ticket_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return ticketResponse;
  }

  @Patch(':collection_id/tickets/:ticket_id')
  async patchTicket(
    @Query() query: CommonTicketQueryParams,
    @Param()
    params: PathParamsWithTicketId,
    @Body() updateTicketBody: UpdateTicketBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await getDataFromAccount(
      integrationAccount,
      `/tickets/${params.ticket_id}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      params,
      updateTicketBody,
    );

    return ticketResponse;
  }

  @Post(':collection_id/tickets')
  async createTicket(
    @Query() query: CommonTicketQueryParams,
    @Param()
    params: PathParams,
    @Body() createTicketBody: CreateTicketBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await getDataFromAccount(
      integrationAccount,
      `/tickets`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      params,
      createTicketBody,
    );

    return ticketResponse;
  }
}
