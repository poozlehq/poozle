/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, SpecificationResponse } from '@poozle/engine-idk';
import { ProxyPath } from 'proxy';

import { AvailablePath } from 'models/calendar/available.path';
import { FreeBusyPath } from 'models/calendar/freeBusy.path';
import spec from './spec';

class GoogleCalendarIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * Read and send calendars
       */
      new FreeBusyPath(/^\/?free-busy$/g, ['POST']),
      new AvailablePath(/^\/?availability$/g, ['POST']),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GoogleCalendarIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
