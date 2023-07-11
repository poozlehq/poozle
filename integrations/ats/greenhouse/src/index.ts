/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, Config, GenericProxyModel, getAccessToken, interpolateString, SpecificationResponse } from '@poozle/engine-idk';

import spec from './spec';

class GreenhouseIntegration extends BaseIntegration {
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

  models() {
    return [new GenericProxyModel()];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GreenhouseIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
