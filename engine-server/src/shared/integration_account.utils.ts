/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { runIntegrationCommand } from './integration_run_utils';

export const enum Method {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
}

export async function getDataFromAccount(
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
  return await runIntegrationCommand(
    integrationAccount.integrationDefinition?.sourceUrl,
    path,
    method,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    integrationAccount.integrationConfiguration as any,
    integrationAccount.authType,
    {
      queryParams,
      pathParams,
      requestBody,
    },
  );
}
