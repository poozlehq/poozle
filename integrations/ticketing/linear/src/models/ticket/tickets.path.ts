/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import {CreateTicketParams, GetTicketsParams, TicketResponse, TicketsResponse} from './ticket.interface';
import { convertTicket } from './ticket.utils';

export class TicketsPath extends BasePath {
  async fetchData(headers: AxiosHeaders, params: GetTicketsParams): Promise<TicketsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query Ticket($page: Int) {
              issues(first: $page ) {
                nodes {
                  id
                  title
                  description
                  createdAt
                  state {
                    name
                  }
                  url
                  parent {
                    id
                  }
                  priority
                  dueDate
                  completedAt
                  assignee {
                    id
                    name
                  }
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          `,
          variables: {
            page,
          },
        },
      });
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

      // case 'POST':
      //   return this.createTicket(headers, params as CreateTicketParams);

      default:
        throw new Error('Method not found');
    }
  }
}
