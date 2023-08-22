/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { formatDateForSince, getBaseUrl, getMetaParams } from 'common';

import { CreateTicketParams, FetchTicketsParams } from './ticket.interface';
import { convertTicket, JIRATicketBody } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchTickets(url: string, headers: AxiosHeaders, { queryParams }: FetchTicketsParams) {
    const page = queryParams.cursor ? parseInt(queryParams.cursor) : 0;
    const startAt = page * queryParams.limit;
    const since = queryParams.created_after
      ? ` AND updatedDate>"${formatDateForSince(queryParams.created_after)}"`
      : '';

    const final_params = {
      maxResults: queryParams.limit,
      startAt,
    };

    const response = await axios({
      url: `${url}${since}`,
      headers,
      params: final_params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.issues.map((data: any) =>
        convertTicket(data, queryParams?.collection_id as string | null),
      ),
      meta: getMetaParams(response.data.issues, queryParams.limit as number, page),
    };
  }

  async createTickets(url: string, headers: AxiosHeaders, params: CreateTicketParams) {
    try {
      const body = params.requestBody;

      const createBody: JIRATicketBody = {
        fields: {
          project: {
            id: params.queryParams.collection_id as string,
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
        data: convertTicket(response.data, params.queryParams.collection_id),
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
    let url = '';
    const baseURL = await getBaseUrl(config, headers);

    switch (method) {
      case 'GET':
        url = `${baseURL}/search?jql=project=${params.queryParams.collection_id}`;
        return this.fetchTickets(url, headers, params);

      case 'POST':
        url = `${baseURL}/rest/api/2/issue`;
        return this.createTickets(url, headers, params as CreateTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
