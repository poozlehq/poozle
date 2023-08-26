/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationAccount = 'getIntegrationAccount';

interface IntegrationAccountsParams {
  integrationAccountId: string;
}

export function getIntegrationAccount(params: IntegrationAccountsParams) {
  return ajaxGet({
    url: `/api/v1/integration_account/${params.integrationAccountId}`,
  });
}

export function useGetIntegrationAccountQuery(
  queryParams: IntegrationAccountsParams,
): UseQueryResult<IntegrationAccount, XHRErrorResponse> {
  return useQuery(
    [GetIntegrationAccount, queryParams.integrationAccountId],
    () => getIntegrationAccount(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
