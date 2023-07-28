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
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  TagQueryParams,
  CommonTagQueryParams,
  PathParams,
  PathParamsWithTagId,
  TicketingTagResponse,
  TicketingTagsResponse,
  UpdateTagBody,
  CreateTagBody,
} from './tag.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class TagController {
  @Get(':collection_id/tags')
  @UseGuards(new AuthGuard())
  async getTags(
    @Query() query: TagQueryParams,
    @Param()
    params: PathParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTagsResponse> {
    const tagsResponse = await getDataFromAccount(
      integrationAccount,
      '/tags',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return tagsResponse;
  }

  @Get(':collection_id/tags/:tag_id')
  async getTag(
    @Query() query: CommonTagQueryParams,
    @Param()
    params: PathParamsWithTagId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTagResponse> {
    const tagResponse = await getDataFromAccount(
      integrationAccount,
      `/tags/${params.tag_name}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return tagResponse;
  }

  @Patch(':collection_id/tags/:tag_id')
  async patchTag(
    @Query() query: CommonTagQueryParams,
    @Param()
    params: PathParamsWithTagId,
    @Body() updateTagBody: UpdateTagBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTagResponse> {
    const tagResponse = await getDataFromAccount(
      integrationAccount,
      `/tags/${params.tag_name}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      updateTagBody,
    );

    return tagResponse;
  }

  @Post(':collection_id/tags')
  async createTag(
    @Query() query: CommonTagQueryParams,
    @Param()
    params: PathParams,
    @Body() createTagBody: CreateTagBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingTagResponse> {
    const tagResponse = await getDataFromAccount(
      integrationAccount,
      `/tags`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      createTagBody,
    );

    return tagResponse;
  }
}
