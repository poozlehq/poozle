/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, CheckResponse, Config, SpecificationResponse } from '@poozle/engine-idk';
import axios from 'axios';

import { BlocksPath } from 'models/block/blocks.path';
import { PagePath } from 'models/page/page.path';
import { PagesPath } from 'models/page/pages.path';

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

  paths() {
    return [
      /**
       * Blocks.
       * 1. Fetching the blocks
       * 2. Updating the blocks
       * 3. Creating a block
       */
      new BlocksPath(/^\/?blocks+/g, ['GET', 'POST', 'PATCH']),

      /**
       * Pages.
       * 1. Fetch Pages
       * 2. Create Page
       * Matches /pages
       */
      new PagesPath(/^\/?pages$/g, ['GET', 'POST']),

      /**
       * Get a page
       * Matches /page
       */
      new PagePath(/^\/?pages+/g, ['GET']),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new NotionIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
