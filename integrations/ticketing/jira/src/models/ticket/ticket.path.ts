/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, UpdateTicketBody } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertTicket, JIRATicketBody } from './ticket.utils';

export class TicketPath extends BasePath {
  async fetchSingleTicket(url: string, headers: AxiosHeaders, params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertTicket(response.data, params.pathParams?.collection_id as string | null);
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchTicket(url: string, headers: AxiosHeaders, params: Params) {
    const body: UpdateTicketBody = params.requestBody as UpdateTicketBody;

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
          ([_, value]) => value !== undefined && value !== null,
        ),
      ),
    };

    const response = await axios.put(url, cleanedCreateBody, { headers });

    return response.data;
  }
  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/issue/${params.pathParams?.ticket_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params);

      case 'PATCH':
        await this.patchTicket(url, headers, params);
        return this.fetchSingleTicket(url, headers, params);

      default:
        return {};
    }
  }
}
