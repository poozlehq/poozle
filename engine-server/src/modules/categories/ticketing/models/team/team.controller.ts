/** Copyright (c) 2023, Poozle, all rights reserved. **/
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
import { Method } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';
import { DataService } from 'modules/data/data.service';

import {
  TeamQueryParams,
  CommonTeamQueryParams,
  PathParamsWithTeamName,
  TicketingTeamResponse,
  TicketingTeamsResponse,
  UpdateTeamBody,
  CreateTeamBody,
} from './team.interface';

@Controller({
  version: '1',
  path: 'ticketing/teams',
})
@ApiTags('Ticketing')
export class TeamController {
  constructor(private dataService: DataService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getTeams(
    @Query() query: TeamQueryParams,

    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTeamsResponse> {
    const teamsResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/teams',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      {},
    );

    return teamsResponse;
  }

  @Get(':team_name')
  async getTeam(
    @Query() query: CommonTeamQueryParams,
    @Param()
    params: PathParamsWithTeamName,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTeamResponse> {
    const teamResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/teams/${params.team_name}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return teamResponse;
  }

  @Patch(':team_name')
  async patchTeam(
    @Query() query: CommonTeamQueryParams,
    @Param()
    params: PathParamsWithTeamName,
    @Body() updateTeamBody: UpdateTeamBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTeamResponse> {
    const teamResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/teams/${params.team_name}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      updateTeamBody,
    );

    return teamResponse;
  }

  @Post()
  async createTeam(
    @Query() query: CommonTeamQueryParams,
    @Body() createTeamBody: CreateTeamBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTeamResponse> {
    const teamResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      `/teams`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      {},
      createTeamBody,
    );

    return teamResponse;
  }
}
