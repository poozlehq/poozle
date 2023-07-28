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
  CommentQueryParams,
  CommonCommentQueryParams,
  PathParams,
  PathParamsWithCommentId,
  TicketingCommentResponse,
  TicketingCommentsResponse,
  UpdateCommentBody,
  CreateCommentBody,
} from './comment.interface';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class CommentController {
  @Get(':collection_id/tickets/:ticket_id/comments')
  @UseGuards(new AuthGuard())
  async getComments(
    @Query() query: CommentQueryParams,
    @Param()
    params: PathParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentsResponse> {
    const commentsResponse = await getDataFromAccount(
      integrationAccount,
      '/comments',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return commentsResponse;
  }

  @Get(':collection_id/tickets/:ticket_id/comments/:comment_id')
  async getComment(
    @Query() query: CommonCommentQueryParams,
    @Param()
    params: PathParamsWithCommentId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    const commentResponse = await getDataFromAccount(
      integrationAccount,
      `/comments/${params.comment_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
    );

    return commentResponse;
  }

  @Patch(':collection_id/tickets/:ticket_id/comments/:comment_id')
  async patchComment(
    @Query() query: CommonCommentQueryParams,
    @Param()
    params: PathParamsWithCommentId,
    @Body() updateCommentBody: UpdateCommentBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    const commentResponse = await getDataFromAccount(
      integrationAccount,
      `/comments/${params.comment_id}`,
      Method.PATCH,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      updateCommentBody,
    );

    return commentResponse;
  }

  @Post(':collection_id/tickets/:ticket_id/comments')
  async createComment(
    @Query() query: CommonCommentQueryParams,
    @Param()
    params: PathParams,
    @Body() createCommentBody: CreateCommentBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    const commentResponse = await getDataFromAccount(
      integrationAccount,
      `/comments`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      params,
      createCommentBody,
    );

    return commentResponse;
  }
}
