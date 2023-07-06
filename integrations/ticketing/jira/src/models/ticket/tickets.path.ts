/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, CreateTicketBody, Ticket, Meta } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertTicket, JIRATicketBody } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchTickets(url: string, headers: AxiosHeaders, params: Params) {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor.toString()) : 1;
    const startAt =
      page * (params.queryParams?.limit ? parseInt(params.queryParams?.limit.toString()) : 10);

    const final_params = {
      maxResults: params.queryParams?.limit,
      startAt,
    };

    try {
      const response = await axios({
        url,
        headers,
        params: final_params,
      });

      return response.data.issues.map((data: any) =>
        convertTicket(data, params.pathParams?.collection_id as string | null),
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async createTickets(url: string, headers: AxiosHeaders, params: Params) {
    try {
      const body: CreateTicketBody = params.requestBody as CreateTicketBody;

      const createBody: JIRATicketBody = {
        fields: {
          project: {
            id: params.pathParams?.collection_id as string,
          },
          summary: body?.name,
          issuetype: {
            name: body?.type,
          },
          assignee: {
            accountId: body?.assignees[0].id,
          },
          reporter: {
            name: body?.created_by,
          },
          labels: body?.tags.map((tag) => tag.name),
        },
      };

      const cleanedCreateBody = {
        fields: Object.fromEntries(
          Object.entries(createBody.fields).filter(
            ([_, value]) => value !== undefined && value !== null,
          ),
        ),
      };

      const createResponse = await axios.post(url, cleanedCreateBody, { headers });

      const response = await axios.get(createResponse.data.self, { headers });
      return convertTicket(response.data, params.pathParams?.collection_id as string | null);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getMetaParams(_data: Ticket[], params: Params): Promise<Meta> {
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
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/search?jql=project=${params.pathParams?.collection_id}`;
        if (params.queryParams?.sort && params.queryParams?.direction) {
          const sort =
            params.queryParams?.sort === 'created_at'
              ? 'created'
              : params.queryParams?.sort === 'updated_at'
              ? 'updated'
              : 'created';
          url += ` ORDER BY ${sort} ${params.queryParams?.direction}`;
        }
        return this.fetchTickets(url, headers, params);

      case 'POST':
        url = `${BASE_URL}/rest/api/2/issue`;
        return this.createTickets(url, headers, params);

      default:
        return {};
    }
  }
}
