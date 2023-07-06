/** Copyright (c) 2023, Poozle, all rights reserved. **/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { getAccessToken, interpolateHeaders, interpolateString } from 'utils/oAuthUtils';

import {
  BaseIntegrationInterface,
  CheckResponse,
  Config,
  SpecificationResponse,
  AuthHeaderResponse,
  RunResponse,
  AuthSpecificationOAuth,
  AuthSpecificationGeneric,
  Params,
} from 'types/integration';

export class BaseIntegration implements BaseIntegrationInterface {
  /*
    This will return the spec for the integration
  */
  async spec(): SpecificationResponse {
    return {
      authSupported: [],
      authSpecification: {},
      supportedFilters: [],
      supportedSortBy: [],
    };
  }

  /*
    This function will be used when the integration is getting configured. We will use this to test with the
    credentials are valid.
  */
  async check(config: Config): CheckResponse {
    const headers = await this.authHeaders(config);

    if (Object.keys(headers).length === 0) {
      return { status: false, error: 'Check failed' };
    }

    return { status: true, error: '' };
  }

  async authHeaders(config: Config): AuthHeaderResponse {
    try {
      let token = '';
      let headers = {};

      if (config.authType === 'OAuth2') {
        const spec = await this.spec();
        const specification = spec.authSpecification['OAuth2'] as AuthSpecificationOAuth;
        headers = specification.headers ?? {};
        token = await getAccessToken(
          interpolateString(specification.token_url as string, config),
          config,
        );
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        const type = config.authType;
        const spec = await this.spec();
        const specification = spec.authSpecification[type] as AuthSpecificationGeneric;
        headers = specification.headers ?? {};
      }

      return interpolateHeaders(headers ? headers : {}, {
        token,
        ...config,
      });
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  models(): any[] {
    return [];
  }

  async run(path: string, method: string, config: Config, params: Params): RunResponse {
    const models = this.models();

    const modelToRun = models.find((model) => model.hasPath(path, method));

    if (modelToRun) {
      return await modelToRun.run(path, method, await this.authHeaders(config), params, config);
    }

    return {
      status: false,
      error: "This Integration doesn't support this path/model",
    };
  }

  async runCommand(command: string, allParams: any) {
    switch (command) {
      case 'SPEC':
        return await this.spec();

      case 'CHECK':
        return await this.check(allParams.config);

      case 'HEADERS':
        return await this.authHeaders(allParams.config);

      case 'RUN':
        if (allParams?.params?.proxy) {
          return await this.run('/proxy', allParams.method, allParams.config, allParams.params);
        }
        return await this.run(allParams.path, allParams.method, allParams.config, allParams.params);

      default:
        return { status: false, error: 'Comamnd not found' };
    }
  }
}
