/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  CheckResponse,
  Config,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

import { fetchCurrentUser } from './utils';

class ClickupExtension extends BaseRestExtensionNew {
  name = 'clickup';
  async authHeaders(config: Config): AuthHeaderResponse {
    return {
      Authorization: config.api_token,
    };
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
    const headers = await this.authHeaders(config);
    await fetchCurrentUser(headers);

    return { status: true, error: '' };
  }
}

export default ClickupExtension;
