/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from 'fs';
import { resolve } from 'path';

import {
  AuthHeaderResponse,
  AuthResponse,
  BaseRestExtensionNew,
  CheckResponse,
  Config,
  TokenResponse,
} from '@poozle/engine-edk';
import { SpecResponse } from '@poozle/engine-edk';

import { fetchAccessToken, getGoogleToken } from './utils';

class GmailExtension extends BaseRestExtensionNew {
  name = 'gmail';
  // redirectUrl = 'https://server.poozle.dev/webhook/gmail';
  redirectUrl = 'https://86a4-2405-201-d02c-d156-2c98-99f5-bbe3-1e7c.in.ngrok.io/webhook/gmail';

  async authHeaders(config: Config): AuthHeaderResponse {
    try {
      const { access_token } = await fetchAccessToken(
        config.client_id,
        config.client_secret,
        config.refresh_token,
      );
      return {
        Authorization: `Bearer ${access_token}`,
      };
    } catch (e) {
      return {};
    }
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
    await fetchAccessToken(
      config.client_id,
      config.client_secret,
      config.refresh_token,
    );

    return { status: true, error: '' };
  }

  async generateAuthUrl(extensionConfig: Config): AuthResponse {
    const state = Buffer.from(
      JSON.stringify({
        extensionAuthId: extensionConfig.extensionAuthId,
        workspaceID: extensionConfig.workSpaceId,
        extensionAccountName: extensionConfig.extensionAccountName
      }),
    ).toString('base64');

    const scope = 'https://mail.google.com/';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${extensionConfig.credentials.client_id}&redirect_uri=${this.redirectUrl}&response_type=code&access_type=offline&state=${state}&scope=${scope}`;
    return { authUrl: authUrl, error: null };
  }

  async fetchTokens(tokenConfig: Config): TokenResponse {
    console.log(tokenConfig.credentials);
    console.log(tokenConfig.queryParameters);

    return {
      tokens: await getGoogleToken(
        tokenConfig.queryParameters.code,
        tokenConfig.credentials.client_id,
        tokenConfig.credentials.client_secret,
        this.redirectUrl
      ),
    };
  }
}

export default GmailExtension;
