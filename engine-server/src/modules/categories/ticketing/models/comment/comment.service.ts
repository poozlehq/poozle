import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { Injectable } from '@nestjs/common';
import {
  applyDateFilter,
  getBaseQuery,
  getMetaParams,
  getObjectFromDb,
} from 'common/knex';
import { pagination } from 'common/utils';
import { DataService } from 'modules/data/data.service';
import { Method } from 'shared/integration_account.utils';
import {
  CommentQueryParams,
  COMMENT_KEYS,
  CreateCommentBody,
  GetCommentsQueryParams,
  PathParamsWithCommentId,
  TicketingCommentsResponse,
  UpdateCommentBody,
} from './comment.interface';

const DATABASE_NAME = 'ticketing_comment';

@Injectable()
export class CommentService {
  constructor(private dataService: DataService) {}

  async getComments(
    integrationAccount: IntegrationAccount,
    query: GetCommentsQueryParams,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getCommentsFoRealtime(integrationAccount, query);
    }

    return await this.getCommentsFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        collection_id: query.collection_id,
        ticket_id: query.ticket_id,
      },
      COMMENT_KEYS,
      query,
    );
  }

  async getComment(
    integrationAccount: IntegrationAccount,
    query: GetCommentsQueryParams,
    params: PathParamsWithCommentId,
  ) {
    if (query.realtime || !integrationAccount.syncEnabled) {
      return await this.getCommentsFoRealtime(integrationAccount, query);
    }

    return await this.getCommentFromDb(integrationAccount, query, params);
  }

  async getCommentsFoRealtime(
    integrationAccount: IntegrationAccount,
    query: GetCommentsQueryParams,
  ) {
    const commentsResponse = await this.dataService.getDataFromAccount(
      integrationAccount,
      '/comments',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query,
      {},
    );

    return commentsResponse;
  }

  async getCommentFromDb(
    integrationAccount: IntegrationAccount,
    query: GetCommentsQueryParams,
    params: PathParamsWithCommentId,
  ) {
    return await getObjectFromDb(
      integrationAccount.workspaceName,
      DATABASE_NAME,
      {
        integration_account_id: integrationAccount.integrationAccountId,
        id: params.comment_id,
        collection_id: query.collection_id,
        ticket_id: query.ticket_id,
      },
      COMMENT_KEYS,
      query.raw,
    );
  }

  async getCommentsFromDb(
    workspaceName: string,
    table: string,
    where: Record<string, string>,
    SELECT_KEYS: string[],
    queryParams: GetCommentsQueryParams,
  ): Promise<TicketingCommentsResponse> {
    const { offset, limit, page } = pagination(
      queryParams.limit,
      queryParams.cursor,
    );

    let query = getBaseQuery<Comment>(
      workspaceName,
      table,
      where,
      SELECT_KEYS,
      queryParams.raw,
    );

    query = applyDateFilter(query, queryParams);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await query.limit(limit).offset(offset)) as any[];

    return {
      data,
      meta: getMetaParams(data, limit, page),
    };
  }

  async pathComment(
    integrationAccount: IntegrationAccount,
    params: PathParamsWithCommentId,
    query: CommentQueryParams,
    updateCommentBody: UpdateCommentBody,
  ) {
    const commentResponse = await this.dataService.getDataFromAccount(
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

  async createComment(
    integrationAccount: IntegrationAccount,
    params: PathParamsWithCommentId,
    query: CommentQueryParams,
    createCommentBody: CreateCommentBody,
  ) {
    const commentResponse = await this.dataService.getDataFromAccount(
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
