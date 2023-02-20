/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtension,
  Config,
  Context,
  BaseURLResponse,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

class NotionExtension extends BaseRestExtension {
  authHeaders(config: Config): AuthHeaderResponse {
    const token = config['api_key'] as string;
    return {
      Authorization: `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  async getSchema(): Promise<string> {
    const schemaJSON = JSON.parse(
      fs.readFileSync(resolve('schema/notion.json'), 'utf8'),
    );

    return schemaJSON;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync('./spec.json', 'utf8');

    return JSON.parse(data) as SpecResponse;
  }

  async baseURL(context: Context): BaseURLResponse {
    return `https://lambda.${context.config.region}.amazonaws.com`;
  }
}

export default NotionExtension;
