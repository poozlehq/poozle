import { BasePath, Config, Params, Ticket, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTicket, CreateTicketBody } from './ticket.utils';

export class TicketPath extends BasePath<Ticket> {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<PathResponse<Ticket>> {
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

  async patchTicket(url: string, headers: AxiosHeaders, params: Params): Promise<PathResponse<Ticket>> {
    const body = params.requestBody;
    const createBody: CreateTicketBody = {
      fields: {
        summary: body?.name,
        issuetype: {
          name: body?.type,
        },
        assignee: {
          accountId: body?.assignee.id,
        },
        reporter: {
          name: body?.created_by,
        },
        labels: body?.tags,
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
  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Ticket>> {
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
