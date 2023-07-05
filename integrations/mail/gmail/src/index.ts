/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, GenericProxyModel, SpecificationResponse } from '@poozle/engine-idk';

import { GmailMessageModel } from 'models/message/message.model';
import { GmailThreadModel } from 'models/thread/thread.model';

import spec from './spec';

class GmailIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  models() {
    return [new GenericProxyModel(), new GmailMessageModel(), new GmailThreadModel()];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GmailIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
