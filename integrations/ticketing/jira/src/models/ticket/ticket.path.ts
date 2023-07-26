/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { FetchTicketParams, UpdateTicketParams } from './ticket.interface';
import { convertTicket, JIRATicketBody } from './ticket.utils';

export class TicketPath extends BasePath {
  async fetchSingleTicket(url: string, headers: AxiosHeaders, params: FetchTicketParams) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return {
        data: convertTicket(response.data, params.pathParams.collection_id),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchTicket(url: string, headers: AxiosHeaders, params: UpdateTicketParams) {
    const body = params.requestBody;

    const createBody: JIRATicketBody = {
      fields: {
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== undefined && value !== null,
        ),
      ),
    };

    const response = await axios.put(url, cleanedCreateBody, { headers });

    return {
      data: convertTicket(response.data, params.pathParams.collection_id),
    };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: FetchTicketParams | UpdateTicketParams,
    config: Config,
  ) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/issue/${params.pathParams?.ticket_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params);

      case 'PATCH':
        await this.patchTicket(url, headers, params as UpdateTicketParams);
        return this.fetchSingleTicket(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
