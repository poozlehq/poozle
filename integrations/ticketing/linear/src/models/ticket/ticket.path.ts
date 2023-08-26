/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import {
  CreateTicketParams,
  TicketResponse,
  UpdateTicketParams,
  UpdateTicketResponse,
} from './ticket.interface';
import { convertTicket, convertUpdateTicket } from './ticket.utils';
import { BASE_URL } from '../../common';

export class TicketPath extends BasePath {
  async fetchSingleTicket(headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    try {
      const id = params.pathParams?.ticket_id;
      const response = await axios.post(
        BASE_URL,
        {
          query: `query Issue($id: String!) {
              issue(id: $id) {
                id
                createdAt
                updatedAt
                archivedAt
                number
                title
                priority
                estimate
                boardOrder
                sortOrder
                startedAt
                completedAt
                startedTriageAt
                triagedAt
                canceledAt
                autoClosedAt
                autoArchivedAt
                dueDate
                slaStartedAt
                slaBreachesAt
                trashed
                snoozedUntilAt
                assignee {
                  id
                  name
                }
                state {
                  name
                }
                identifier
                url
                branchName
                customerTicketCount
                labels {
                  nodes {
                     id
                     name
                  }
                }
                description
                descriptionData
                creator {
                  name
                }
              }
            }`,
          variables: {
            id,
          },
        },
        {
          headers,
        },
      );
      return { data: convertTicket(response.data.data.issue) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async patchTicket(headers: AxiosHeaders, params: UpdateTicketParams): Promise<TicketResponse> {
    try {
      const id = params.pathParams?.ticket_id;
      const title = params.requestBody.name;
      const description = params.requestBody.description;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            mutation Team($id: String!) {
              issue(id: $id) {
                id
                title
                description
              }
            }
          `,
          variables: {
            id,
            title,
            description,
          },
        },
      });
      return { data: convertTicket(response.data.data.team) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async createTicket(
    headers: AxiosHeaders,
    params: CreateTicketParams,
  ): Promise<UpdateTicketResponse> {
    try {
      const issueCreateInput = params.requestBody;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            mutation IssueCreate($input: IssueCreateInput!) {
              issueCreate(input: $input) {
                lastSyncId
                success
              }
            }
          `,
          variables: {
            input: issueCreateInput,
          },
        },
        {
          headers,
        },
      );
      return convertUpdateTicket(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(headers, params);

      case 'POST':
        return this.createTicket(headers, params as CreateTicketParams);

      case 'PATCH':
        await this.patchTicket(headers, params as UpdateTicketParams);
        return this.fetchSingleTicket(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
