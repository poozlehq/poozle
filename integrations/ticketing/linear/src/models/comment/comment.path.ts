/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { CommentResponse, MutateCommentResponse, UpdateCommentParams } from './comment.interface';
import { convertComment } from './comment.utils';
import { BASE_URL } from '../../common';

export class CommentPath extends BasePath {
  async fetchSingleComment(
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: Params,
  ): Promise<CommentResponse> {
    try {
      const id = params.pathParams?.comment_id;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            query Query($commentId: String!) {
              comment(id: $commentId) {
                id
                createdAt
                updatedAt
                archivedAt
                body
                issue {
                  id
                }
                parent {
                  id
                }
                user {
                  id
                }
                editedAt
                bodyData
                reactionData
                url
              }
            }
          `,
          variables: {
            id,
          },
        },
        { headers },
      );
      return { data: convertComment(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchComment(
    headers: AxiosHeaders,
    params: UpdateCommentParams,
  ): Promise<MutateCommentResponse> {
    try {
      const id = params.pathParams?.comment_id;
      const input = params.requestBody;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            mutation Mutation($input: CommentUpdateInput!, $commentUpdateId: String!) {
              commentUpdate(input: $input, id: $commentUpdateId) {
                lastsyncId
                success
                comment {
                  id
                }
              }
            }
          `,
          variables: {
            id,
            input,
          },
        },
        { headers },
      );
      return {
        lastSyncId: response.data.lastSyncId,
        success: response.data.success,
        data: convertComment(response.data),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchSingleComment(headers, params);

      case 'PATCH':
        await this.patchComment(headers, params as UpdateCommentParams);
        return this.fetchSingleComment(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
