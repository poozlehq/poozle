/** Copyright (c) 2023, Poozle, all rights reserved. **/

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
import { getAccessToken, interpolateHeaders, interpolateString } from 'utils/oAuthUtils';

export class BaseIntegration implements BaseIntegrationInterface {
  constructor() {}

  /*
    This will return the spec for the extension
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
    This function will be used when the extension is getting configured. We will use this to test with the
    credentials are valid.
  */
  async check(_config: Config): CheckResponse {
    try {
      return { status: false, error: '' };
    } catch (err) {
      return {
        status: false,
        error: err.message as string,
      };
    }
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
          interpolateString(specification.tokenUrl as string, config),
          config,
        );
        headers = {
          Authorization: 'Bearer ${token}',
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
