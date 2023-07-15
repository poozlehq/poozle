/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';

import { NotionBlockModel } from 'models/block/block.model';
import { NotionPageModel } from 'models/page/page.model';

import spec from './spec';

class NotionIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      const headers = await this.authHeaders(config);

      await axios({
        url: 'https://api.notion.com/v1/users',
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

  models() {
    return [new GenericProxyModel(), new NotionPageModel(), new NotionBlockModel()];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new NotionIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
