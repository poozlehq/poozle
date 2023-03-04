/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtension,
  Config,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

class PipedriveExtension extends BaseRestExtension {
  authHeaders(config: Config): AuthHeaderResponse {
    // Need to return the headers the API expects
    const token = config['api_key'] as string;
    return {
      Authorization: `Basic ${token}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  qs(config: Config): Promise<Record<string, string>> {
    return {
      api_key: config['api_key'],
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
}

export default PipedriveExtension;
