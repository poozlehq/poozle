/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "modules/auth/auth.guard";
import { TicketService } from "../ticket/ticket.service";
import { PathParamsWithCollectionId } from "../collection/collection.interface";
import { GetIntegrationAccount } from "common/decorators/integration_account.decorator";
import { IntegrationType } from "@prisma/client";
import { IntegrationAccount } from "@@generated/integrationAccount/entities";
import { CommonTicketQueryParams } from "../ticket/tickets.interface";

@Controller({
    version: '1',
    path: 'ticketing/:collection_id/types',
  })
@ApiTags('Ticketing')
@UseGuards(new AuthGuard())
export class TicketTypesController {
  constructor(private ticketsService: TicketService) {}

  // Create a GET endpoint to fetch ticket types on a collection id
  @Get()
  async getTicketTypes(
    @Query() query: CommonTicketQueryParams,
    @Param()
    params: PathParamsWithCollectionId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount
  ) {
    return await this.ticketsService.getTicketTypes(
      query,
      params,
      integrationAccount,
    );
  }
}
