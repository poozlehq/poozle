/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { defaultQueryParams } from 'common/interfaces/defaults.constants';
import { QueryParams } from 'common/interfaces/query.interface';

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
  queryParams: QueryParams = defaultQueryParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pathParams: any,
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
    },
  );
}
