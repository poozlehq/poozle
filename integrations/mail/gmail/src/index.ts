/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';

import { GmailThreadModel } from 'models/thread/thread.model';
import { GmailMessageModel } from 'models/message/message.model';

import spec from './spec';

class GmailIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      await axios({
        url: `https://api.github.com/user`,
        headers: {
          Authorization: `Bearer ${config.api_key}`,
        },
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

  models() {
    return [
      new GenericProxyModel(),
      new GmailMessageModel(),
      new GmailThreadModel(),
    ];
  }
}

export async function main(command: string, allParams: any) {
  const integration = new GmailIntegration();

  const response = await integration.runCommand(command, allParams);

  console.log(response)
  return response;
}

// export default main;
main('RUN', {
  path: '/threads/1891943dbdcb9761',
  method: 'GET',
  params: {
    queryParams: { raw: true, limit: 1 },
    pathParams: { collection_id: 'DBT-Denorm', thread_id: '1891943dbdcb9761'},
    requestBody: {
      name: "new bug",
      description: 'this is updated from unified',
      color: '0f0ff0'
    }
  },
  config: {
    access_token: 'ya29.a0AbVbY6PkSKLUyzjpDsCJVM897v2_U2YPkETul3FAZInGK0NTZKLFJNbN92gGQfcrcQLYmdbBIecjiGlavNPFpZi4Le_aIaDoHF4eNuOgCjfBsLLArdJehKUCVsS33xPZi2zsdG-ZlVC1cDmm4WsCg65ZOy_XmFS0aCgYKATcSARASFQFWKvPld322-X8xKxGy4wTxXzD0kA0167',
    authType: 'Api Key',
  },
})