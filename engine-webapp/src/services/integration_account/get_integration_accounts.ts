/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities/integrationAccount.entity';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationAccounts = 'getIntegrationAccounts';

interface IntegrationAccountsParams {
  workspaceId: string;
}

export function getIntegrationAccounts(params: IntegrationAccountsParams) {
  const querySet: Record<string, Primitive> = { ...params };

  return ajaxGet({
    url: '/api/v1/integration_account',
    query: querySet,
  });
}

export function useGetIntegrationAccounts(
  queryParams: IntegrationAccountsParams,
): UseQueryResult<IntegrationAccount[], XHRErrorResponse> {
  return useQuery(
    [GetIntegrationAccounts, queryParams],
    () => getIntegrationAccounts(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
