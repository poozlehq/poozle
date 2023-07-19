/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, SpecificationResponse } from '@poozle/engine-idk';
import { ProxyPath } from 'proxy';

import { MessagePath } from 'models/message/message.path';
import { MessagesPath } from 'models/message/messages.path';
import { ThreadPath } from 'models/thread/thread.path';
import { ThreadsPath } from 'models/thread/threads.path';

import spec from './spec';

class GmailIntegration extends BaseIntegration {
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
       * Read and send emails
       */
      new MessagesPath(/^\/?messages$/g, ['GET', 'POST']),
      new MessagePath(/^\/?messages+/g, ['GET']),

      /**
       * Read and send email threads
       */
      new ThreadsPath(/^\/?threads$/g, ['GET']),
      new ThreadPath(/^\/?threads+/g, ['GET']),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GmailIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
