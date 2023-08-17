/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, CheckResponse, Config, SpecificationResponse } from '@poozle/engine-idk';
import axios from 'axios';
import { ProxyPath } from 'proxy';

import { ChargePath } from 'models/charge/charge.path';
import { ChargesPath } from 'models/charge/charges.path';
import { DisputePath } from 'models/dispute/dispute.path';
import { DisputesPath } from 'models/dispute/disputes.path';

import spec from './spec';

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      const headers = await this.authHeaders(config);

      await axios({
        url: 'https://api.stripe.com/v1/customers',
        headers,
      });

      return {
        status: true,
        error: '',
      };
    } catch (e) {
      return {
        status: false,
        error: e.message,
      };
    }
  }

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * These paths get charges from stripe
       */
      new ChargesPath(/^\/?charges$/g, 'GET'),
      new ChargePath(/^\/?charges+/g, 'GET'),

      /**
       * This paths get the disputes from stripe
       */
      new DisputesPath(/^\/?disputes$/g, 'GET'),
      new DisputePath(/^\/?disputes+/g, 'GET'),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
