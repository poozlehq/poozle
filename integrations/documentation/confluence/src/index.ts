/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, CheckResponse, Config, getAccessToken, interpolateString, SpecificationResponse } from '@poozle/engine-idk';
import axios from 'axios';
import { ProxyPath } from 'proxy';

import { BlocksPath } from 'models/block/blocks.path';
import { PagePath } from 'models/page/page.path';
import { PagesPath } from 'models/page/pages.path';

import spec from './spec';

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
          Authorization: `Bearer ${token}`,
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
      const headers = await this.authHeaders(config);

      await axios({
        url: `https://${config.jira_domain}.atlassian.net/wiki/rest/api/content?limit=1`,
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


  console.log(JSON.stringify(response))
  return response;
}

export default main;


main('RUN', {
  path: '/blocks/621838349',
  method: 'GET',
  params: {
    queryParams: { raw: false },
    pathParams: { parent_id: '621838349', label_name: 'new bug'},
    requestBody: {
      name: "new bug",
      description: 'this is updated from unified',
      color: '0f0ff0'
    }
  },
  config: {
    email_id: 'aditya@velocity.in',
    confluence_domain: 'gelocity.atlassian.net',
    api_key: 'ATATT3xFfGF0M4-QmAZ2P8Ii_tQNBZuUAw2IqVidamf37BXE5hRSKA9NIiZZ5AbRZTalQ9cSBP6HnlA2o2yhOCjy47Q-aGBFNLBDP0LiTkTAV-INW2QYwfEZAu51Ij6QhYx_NaEJFwzVHTQhtH5baagbj_KrFjBm-GUuduaPto38vHdoyJzGO-0=7BDDB83D',
    authType: 'Api Key',
  },
})