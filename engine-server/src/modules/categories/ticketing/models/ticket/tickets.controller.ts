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

import { TicketService } from './ticket.service';
import {
  PathParamsWithTicketId,
  ListTicketsQueryParams,
  TicketingTicketResponse,
  TicketingTicketsResponse,
  CommonTicketQueryParams,
  UpdateTicketBody,
  CreateTicketBody,
  GetTicketsQueryParams,
  PathParamsWithCollectionId,
} from './tickets.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
@UseGuards(new AuthGuard())
export class TicketsController {
  constructor(private ticketService: TicketService) {}

  @Get('tickets')
  async getTickets(
    @Query() query: ListTicketsQueryParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketsResponse> {
    const ticketsResponse = await this.ticketService.getTickets(
      integrationAccount,
      query,
    );

    return ticketsResponse;
  }

  @Get(':collection_id/tickets')
  async getCollectionTickets(
    @Query() query: ListTicketsQueryParams,
    @Param()
    params: PathParamsWithCollectionId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketsResponse> {
    const ticketsResponse = await this.ticketService.getCollectionTickets(
      integrationAccount,
      query,
      params,
    );

    return ticketsResponse;
  }

  @Get(':collection_id/tickets/:ticket_id')
  async getTicketId(
    @Query() query: GetTicketsQueryParams,
    @Param()
    params: PathParamsWithTicketId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTicketResponse> {
    const ticketResponse = await this.ticketService.getTicket(
      integrationAccount,
      query,
      params,
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
    params: PathParamsWithCollectionId,
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
