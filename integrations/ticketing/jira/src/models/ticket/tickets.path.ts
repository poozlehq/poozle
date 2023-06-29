import { BasePath, Config, Params, Ticket, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertTicket, CreateTicketBody } from './ticket.utils';

export class TicketsPath extends BasePath<Ticket> {
  async fetchTickets(url: string, headers: AxiosHeaders, params: Params) {
    try {
      const response = await axios({
        url,
        headers,
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
      const body = params.requestBody;
      const createBody: CreateTicketBody = {
        fields: {
          project: {
            id: body?.id,
          },
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

      const createResponse = await axios.post(url, cleanedCreateBody, { headers });

      const response = await axios.get(createResponse.data.self, {headers})
      return convertTicket(response.data,  params.pathParams?.collection_id as string | null);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Ticket>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = ''

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/search?jql=project=${params.pathParams?.collection_id}`;
        return this.fetchTickets(url, headers, params);

      case 'POST':
        url = `${BASE_URL}/rest/api/2/issue`
        return this.createTickets(url, headers, params);

      default:
        return {};
    }
  }
}
