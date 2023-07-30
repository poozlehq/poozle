/** Copyright (c) 2023, Poozle, all rights reserved. **/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosHeaders } from 'axios';
import { getAccessToken, interpolateHeaders, interpolateString } from 'utils/oAuthUtils';

import {
  BaseIntegrationInterface,
  CheckResponse,
  Config,
  SpecificationResponse,
  AuthHeaderResponse,
  RunResponse,
  Params,
} from 'types/integration';

import { BasePath } from './base_path';

export class BaseIntegration implements BaseIntegrationInterface {
  /*
    This will return the spec for the integration
  */
  async spec(): SpecificationResponse {
    return {
      auth_specification: {},
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
      let token: Record<string, string> = {};
      let headers = {};

      if (config.authType === 'OAuth2') {
        const spec = await this.spec();
        const specification = spec.auth_specification['OAuth2'];
        headers = specification.headers ?? {};
        token = await getAccessToken(
          interpolateString(specification.token_url as string, config),
          config,
        );
        headers = {
          ...headers,
          Authorization: `Bearer ${token.access_token}`,
          'refresh-token': token.refresh_token,
          expiry: token.expires_in,
        };
      } else {
        const type = config.authType;
        const spec = await this.spec();
        const specification = spec.auth_specification[type];
        headers = specification.headers ?? {};
      }

      return interpolateHeaders(headers ? headers : {}, {
        token: token.access_token,
        ...config,
      });
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  paths(): any[] {
    return [];
  }

  async run(
    path: string,
    method: string,
    config: Config,
    headers: Record<string, string> | undefined,
    params: Params,
  ): RunResponse {
    const paths = this.paths();

    const pathToRun: BasePath | undefined = paths.find((p) => p.isPath(path, method));

    if (pathToRun) {
      return await pathToRun.baseRun(method, headers as AxiosHeaders, params, config);
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
          return await this.run(
            '/proxy',
            allParams.method,
            allParams.config,
            allParams.headers,
            allParams.params,
          );
        }
        return await this.run(
          allParams.path,
          allParams.method,
          allParams.config,
          allParams.headers,
          allParams.params,
        );

      default:
        return { status: false, error: 'Command not found' };
    }
  }
}
