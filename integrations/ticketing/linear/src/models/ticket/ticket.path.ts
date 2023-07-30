/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {BasePath, Config, convertToRequestBody, Params} from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { TicketResponse, TicketParams } from './ticket.interface';
import { convertTicket, ticketMappings } from './ticket.utils';
import {convertTeam} from "../team/team.utils";

export class TicketPath extends BasePath {
  async fetchSingleTicket(
    url: string,
    headers: AxiosHeaders,
    params: TicketParams,
    _config: Config,
  ): Promise<TicketResponse> {
    const id = params.pathParams?.ticket_id;
    const response = await axios({
      url,
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
  }

  async run(method: string, headers: AxiosHeaders, params: TicketParams, config: Config) {
    const url = `${BASE_URL}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(url, headers, params, config);

      default:
        throw new Error('Method not found');
    }
  }
}
