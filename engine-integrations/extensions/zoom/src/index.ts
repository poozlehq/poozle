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

import { getAccessToken } from './utils';

class ZoomExtension extends BaseRestExtensionNew {
  name = 'zoom';

  async authHeaders(config: Config): AuthHeaderResponse {
    const token = await getAccessToken(
      config.client_id,
      config.client_secret,
      config.account_id,
    );

    return {
      Authorization: `Bearer ${token}`,
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
    await getAccessToken(
      config.client_id,
      config.client_secret,
      config.account_id,
    );

    return { status: true, error: '' };
  }
}

export default ZoomExtension;
