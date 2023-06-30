/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, CreateCommentBody, Meta, Comment } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertComments } from './comments.utils';

export class GetCommentsPath extends BasePath {
  async fetchComments(url: string, headers: AxiosHeaders, params: Params) {
    const page =
    typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const response = await axios({
      url,
      headers,
      params: {
        maxResults: params.queryParams?.limit,
        startAt: page,
      },
    });

    return response.data.comments.map((data: any) =>
      convertComments(data, params.pathParams?.ticket_id as string | null),
    );
  }

  async createComment(url: string, headers: AxiosHeaders, params: Params) {
    const createBody: CreateCommentBody = params.requestBody as CreateCommentBody;

    const response = await axios.post(url, createBody, { headers });

    return convertComments(response.data, params.pathParams?.ticket_id as string | null);
  }

  async getMetaParams(_data: Comment[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }


  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/issue/${params.pathParams?.ticket_id}/comment`;
    switch (method) {
      case 'GET':
        return this.fetchComments(url, headers, params);

      case 'POST':
        return this.createComment(url, headers, params);

      default:
        return {};
    }
  }
}
