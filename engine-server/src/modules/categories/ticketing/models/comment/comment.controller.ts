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

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithCommentId,
  TicketingCommentResponse,
  TicketingCommentsResponse,
  UpdateCommentBody,
  CreateCommentBody,
  GetCommentsQueryParams,
  CommentQueryParams,
} from './comment.interface';
import { CommentService } from './comment.service';

@Controller({
  version: '1',
  path: 'ticketing',
})
@ApiTags('Ticketing')
export class CommentController {
  // constructor(private dataService: DataService) {}
  constructor(private commentService: CommentService) {}

  @Get('comments')
  @UseGuards(new AuthGuard())
  async getComments(
    @Query() query: GetCommentsQueryParams,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentsResponse> {
    const commentsResponse = await this.commentService.getComments(
      integrationAccount,
      query,
    );

    return commentsResponse;
  }

  @Get('comments/:comment_id')
  async getComment(
    @Query() query: GetCommentsQueryParams,
    @Param()
    params: PathParamsWithCommentId,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    const commentResponse = await this.commentService.getComment(
      integrationAccount,
      query,
      params,
    );

    return commentResponse;
  }

  @Patch('comments/:comment_id')
  async patchComment(
    @Query() query: CommentQueryParams,
    @Param()
    params: PathParamsWithCommentId,
    @Body() updateCommentBody: UpdateCommentBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    return this.commentService.pathComment(
      integrationAccount,
      params,
      query,
      updateCommentBody,
    );
  }

  @Post('comments')
  async createComment(
    @Query() query: CommentQueryParams,
    @Param()
    params: PathParamsWithCommentId,
    @Body() createCommentBody: CreateCommentBody,
    @GetIntegrationAccount(IntegrationType.TICKETING)
    integrationAccount: IntegrationAccount,
  ): Promise<TicketingCommentResponse> {
    return this.commentService.createComment(
      integrationAccount,
      params,
      query,
      createCommentBody,
    );
  }
}
