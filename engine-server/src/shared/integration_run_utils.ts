/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CheckResponse, Config, Specification } from '@poozle/engine-edk';

import { loadRemoteModule } from 'common/remoteModule';

export const getIntegrationSpec = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  integrationSourceUrl: any,
): Promise<Specification> => {
  const integrationSource = await loadRemoteModule(integrationSourceUrl);

  return await integrationSource.default('SPEC', {});
};

export const checkIntegrationCredentials = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  integrationSourceUrl: any,
  config: Config,
  authType: string,
): CheckResponse => {
  const integrationSource = await loadRemoteModule(integrationSourceUrl);

  return await integrationSource.default('CHECK', {
    config: {
      ...config,
      authType,
    },
  });
};

export const runIntegrationCommand = async (
  integrationSourceUrl: string,
  path: string,
  method: string,
  config: Config,
  authType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>,
) => {
  const integrationSource = await loadRemoteModule(integrationSourceUrl);
  return await integrationSource.default('RUN', {
    config: {
      ...config,
      authType,
    },
    path,
    method,
    params,
  });
};

export const runProxyIntegrationCommand = async (
  integrationSourceUrl: string,
  path: string,
  method: string,
  config: Config,
  authType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>,
) => {
  const integrationSource = await loadRemoteModule(integrationSourceUrl);
  let finalParams: any = {
    proxy: true,
  };

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    finalParams['requestBody'] = params.requestBody;
  }

  return await integrationSource.default('RUN', {
    config: {
      ...config,
      authType,
    },
    path: '',
    method,
    params: {
      proxy: true,
      url: path,
    },
  });
};
