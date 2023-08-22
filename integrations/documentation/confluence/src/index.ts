/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  getAccessToken,
  interpolateString,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';
import { ProxyPath } from 'proxy';

import { BlocksPath } from 'models/block/blocks.path';
import { PagePath } from 'models/page/page.path';
import { PagesPath } from 'models/page/pages.path';

import spec from './spec';
import { getBaseUrl } from 'common';

class NotionIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async authHeaders(config: Config) {
    try {
      if (config.authType === 'OAuth2') {
        const spec = await this.spec();
        const specification = spec.auth_specification['OAuth2'];
        const token = await getAccessToken(
          interpolateString(specification.token_url as string, config),
          config,
        );
        const headers = {
          Authorization: `Bearer ${token.access_token}`,
          'refresh-token': token.refresh_token,
          expiry: token.expires_in,
        };
        return headers;
      }

      return {
        Authorization: `Basic ${Buffer.from(`${config.email_id}:${config.api_key}`).toString(
          'base64',
        )}`,
      };
    } catch (err) {
      return {};
    }
  }

  async check(config: Config): CheckResponse {
    try {
      const headers = (await this.authHeaders(config)) as Record<string, string>;
      const baseURL = await getBaseUrl(config, headers);

      await axios({
        url: `${baseURL}/pages?limit=1`,
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
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),
      /**
       * Blocks.
       * 1. Fetching the blocks
       * 2. Updating the blocks
       * 3. Creating a block
       */
      new BlocksPath(/^\/?blocks+/g, ['GET']),

      /**
       * Pages.
       * 1. Fetch Pages
       * 2. Create Page
       * Matches /pages
       */
      new PagesPath(/^\/?pages$/g, ['GET']),

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
