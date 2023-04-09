/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  CheckResponse,
  Config
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';
import { fetchCurrentUser } from './utils';

class JiraExtension extends BaseRestExtensionNew {
  name = 'jira';
  async authHeaders(config: Config): AuthHeaderResponse {
    return {
      Authorization: `Basic ${Buffer.from(
        `${config.email}:${config.api_key}`,
      ).toString('base64')}`,
    };
  }

  async getURL(config: Config): Promise<string> {
    return `https://${config.domain_name}/rest/api/3`;
  }

  async getSchema(): Promise<string> {
    const schemaJSON = JSON.parse(
      fs.readFileSync(resolve('schema/schema.json'), 'utf8'),
    );

    return schemaJSON;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync('./spec.json', 'utf8');

    return JSON.parse(data) as SpecResponse;
  }

  async checkCredentials(config: Config): CheckResponse {
    const authHeaders = await this.authHeaders(config);
    const url = await this.getURL(config);
    await fetchCurrentUser(url, authHeaders);

    return { status: true, error: '' };
  }
}

export default JiraExtension;
