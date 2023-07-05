/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-idk';

import { GmailMessageModel } from 'models/message/message.model';
import { GmailThreadModel } from 'models/thread/thread.model';

import spec from './spec';
import { fetchAccessToken } from './utils';

class GmailIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async authHeaders(config: Config) {
    return {
      Authorization: `Bearer ${await fetchAccessToken(
        config.client_id,
        config.client_secret,
        config.refresh_token,
      )}`,
    };
  }

  async check(config: Config): CheckResponse {
    try {
      await fetchAccessToken(config.client_id, config.client_secret, config.refresh_token);

      return { status: true, error: '' };
    } catch (e) {
      return {
        status: false,
        error: e.message,
      };
    }
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
