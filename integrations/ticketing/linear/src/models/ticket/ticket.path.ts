/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import { AxiosHeaders } from 'axios';

import { TicketResponse } from './ticket.interface';

export class TicketPath extends BasePath {
  async fetchSingleTicket(headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async patchTicket(headers: AxiosHeaders, params: Params): Promise<TicketResponse> {
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    switch (method) {
      case 'GET':
        return this.fetchSingleTicket(headers, params);

      case 'PATCH':
        await this.patchTicket(headers, params);
        return this.fetchSingleTicket(headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
