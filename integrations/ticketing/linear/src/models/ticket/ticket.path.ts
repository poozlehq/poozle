/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { TicketResponse, UpdateTicketParams } from './ticket.interface';
import { convertTicket } from './ticket.utils';
import { BASE_URL } from '../../common';

export class TicketPath extends BasePath {
  async fetchSingleTicket(headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    try {
      const id = params.pathParams?.ticket_id;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query ExampleQuery($id: String!) {
              issue(id: $id) {
                id
                title
                description
              }
            }
          `,
          variables: {
            id,
          },
        },
      });
      return { data: convertTicket(response.data) };
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
      return { data: convertTicket(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(headers, params);

      case 'PATCH':
        await this.patchTicket(headers, params as UpdateTicketParams);
        return this.fetchSingleTicket(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
