/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import { CheckResponse, Config } from '@poozle/engine-idk';
import { Method } from 'axios';
import { PrismaService } from 'nestjs-prisma';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { loadRemoteModule } from 'common/remoteModule';

@Injectable()
export class DataService {
  constructor(private prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentials: Record<string, Record<string, string>> = {};

  async proxyIntegrationCommand(
    integrationAccount: IntegrationAccount,
    path: string,
    method: Method,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: Record<string, any>,
  ) {
    return await this.runProxyIntegrationCommand(
      integrationAccount,
      path,
      method,
      params,
    );
  }

  async getDataFromAccount(
    integrationAccount: IntegrationAccount,
    path: string,
    method: Method,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pathParams: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestBody?: any,
  ) {
    return await this.runIntegrationCommand(integrationAccount, path, method, {
      queryParams,
      pathParams,
      requestBody,
    });
  }

  async checkIntegrationCredentials(
    integrationSourceUrl: string,
    config: Config,
    authType: string,
  ): CheckResponse {
    const integrationSource = await loadRemoteModule(integrationSourceUrl);

    const response = await integrationSource.default('CHECK', {
      config: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...config,
        authType,
      },
    });

    return response;
  }

  /**
   * Header utils
   */

  async getHeaders(integrationAccount: IntegrationAccount) {
    const integrationSource = await loadRemoteModule(
      integrationAccount.integrationDefinition.sourceUrl,
    );

    let headers: Record<string, string> =
      this.credentials[integrationAccount.integrationAccountId];

    if (!headers) {
      try {
        headers = await this.runHeaders(integrationAccount, integrationSource);

        // this.credentials[integrationAccount.integrationAccountId] = headers;
      } catch (err) {
        throw new Error('Token is expired');
      }
    }

    return headers;
  }

  async runHeaders(
    integrationAccount: IntegrationAccount,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    integrationSource: any,
  ) {
    const headers = await integrationSource.default('HEADERS', {
      config: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(integrationAccount.integrationConfiguration as any),
        authType: integrationAccount.authType,
      },
    });

    if (integrationAccount.authType === 'OAuth2') {
      if (headers['refresh-token']) {
        await this.prismaService.integrationAccount.update({
          data: {
            authType: integrationAccount.authType,
            integrationConfiguration: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(integrationAccount.integrationConfiguration as any),
              refresh_token: headers['refresh-token'],
            },
            integrationAccountName: integrationAccount.integrationAccountName,
            syncEnabled: integrationAccount.syncEnabled,
          },
          where: {
            integrationAccountId: integrationAccount.integrationAccountId,
          },
        });

        // Delete these both from the headers
        delete headers['refresh-token'];
        delete headers['expiry'];
      }
    }
    return headers;
  }

  /**
   * Direct commands to integration
   */

  async runIntegrationCommand(
    integrationAccount: IntegrationAccount,
    path: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: Record<string, any>,
  ) {
    const integrationSource = await loadRemoteModule(
      integrationAccount.integrationDefinition.sourceUrl,
    );

    const headers = await this.getHeaders(integrationAccount);

    return await integrationSource.default('RUN', {
      config: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(integrationAccount.integrationConfiguration as any),
        authType: integrationAccount.authType,
      },
      headers,
      path,
      method,
      params,
    });
  }

  async runProxyIntegrationCommand(
    integrationAccount: IntegrationAccount,
    path: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: Record<string, any>,
  ) {
    const integrationSource = await loadRemoteModule(
      integrationAccount.integrationDefinition.sourceUrl,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalParams: any = {
      proxy: true,
    };
    const headers = await this.getHeaders(integrationAccount);

    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
      finalParams['requestBody'] = params.requestBody;
    }

    try {
      const response = await integrationSource.default('RUN', {
        config: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(integrationAccount.integrationConfiguration as any),
          authType: integrationAccount.authType,
        },
        headers,
        path: '',
        method,
        params: {
          proxy: true,
          url: path,
        },
      });

      if (response.error) {
        return { data: {}, error: response.error.message };
      }

      return { data: response };
    } catch (e) {
      return e;
    }
  }
}
