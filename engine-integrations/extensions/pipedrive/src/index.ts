/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import { BaseRestExtension, CheckResponse, Config } from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

import { fetchCurrentUser } from './utils';

class PipedriveExtension extends BaseRestExtension {
  name = 'pipedrive';

  qs(config: Config): Promise<Record<string, string>> {
    return {
      api_token: config['api_token'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
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
    const qs = await this.qs(config);
    await fetchCurrentUser(qs);

    return { status: true, error: '' };
  }
}

export default PipedriveExtension;
