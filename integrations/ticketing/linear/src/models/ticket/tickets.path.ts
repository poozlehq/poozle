/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { GetTicketsParams, TicketsResponse } from './ticket.interface';
import { convertTicket } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(headers: AxiosHeaders, params: GetTicketsParams): Promise<TicketsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            query Issues {
              issues {
                nodes {
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
                  creator {
                    name
                  }
                  description
                  descriptionData
                }
                pageInfo {
                   endCursor
                   hasNextPage
                }
              }
            }
          `,
        },
        { headers },
      );
      const ticketsList: object[] = response.data.data.issues.nodes;
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: ticketsList.map(convertTicket),
        meta: getMetaParams(response.data, params.queryParams?.limit, page),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchData(headers, params as GetTicketsParams);

      default:
        throw new Error('Method not found');
    }
  }
}
