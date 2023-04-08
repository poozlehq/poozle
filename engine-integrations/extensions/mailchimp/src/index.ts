/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  CheckResponse,
  Config,
  // Context,
  // BaseURLResponse,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

import { pingMailchimp } from './utils';
// import { compareNodes } from "@graphql-tools/utils";

class MailchimpExtension extends BaseRestExtensionNew {
  name = 'mailchimp';

  async authHeaders(config: Config): AuthHeaderResponse {
    return {
      Authorization: `Bearer ${config['api_key']}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }

  async getURL(config: Config): Promise<string> {
    return `https://${config.data_center}.admin.mailchimp.com`;
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
    await pingMailchimp(config.data_center, headers);

    return { status: true, error: '' };
  }
}

export default MailchimpExtension;
