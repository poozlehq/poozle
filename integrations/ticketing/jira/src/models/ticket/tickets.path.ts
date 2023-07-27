/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getMetaParams } from 'common';

import { CreateTicketParams, FetchTicketsParams } from './ticket.interface';
import { convertTicket, JIRATicketBody } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchTickets(url: string, headers: AxiosHeaders, params: FetchTicketsParams) {
    const page = params.queryParams.cursor ? parseInt(params.queryParams.cursor) : 1;
    const startAt = page * (params.queryParams.limit ? params.queryParams.limit : 10);

    const final_params = {
      maxResults: params.queryParams.limit,
      startAt,
    };

    try {
      const response = await axios({
        url,
        headers,
        params: final_params,
      });

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: response.data.issues.map((data: any) =>
          convertTicket(data, params.pathParams?.collection_id as string | null),
        ),
        meta: getMetaParams(response.data.issues, params.queryParams.limit, page),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async createTickets(url: string, headers: AxiosHeaders, params: CreateTicketParams) {
    try {
      const body = params.requestBody;

      const createBody: JIRATicketBody = {
        fields: {
          project: {
            id: params.pathParams.collection_id as string,
          },
          summary: body.name,
          issuetype: {
            name: body.type,
          },
          assignee: {
            accountId: body.assignees[0].id,
          },
          reporter: {
            name: body.created_by,
          },
          labels: body.tags.map((tag) => tag.name),
        },
      };

      const cleanedCreateBody = {
        fields: Object.fromEntries(
          Object.entries(createBody.fields).filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) => value !== undefined && value !== null,
          ),
        ),
      };

      const createResponse = await axios.post(url, cleanedCreateBody, { headers });

      const response = await axios.get(createResponse.data.self, { headers });

      return {
        data: convertTicket(response.data, params.pathParams.collection_id),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: FetchTicketsParams | CreateTicketParams,
    config: Config,
  ) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/search?jql=project=${params.pathParams.collection_id}`;
        return this.fetchTickets(url, headers, params);

      case 'POST':
        url = `${BASE_URL}/rest/api/2/issue`;
        return this.createTickets(url, headers, params as CreateTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
