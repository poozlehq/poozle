/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount.entity';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationOAuthApps = 'getIntegrationOAuthApps';

interface IntegrationOAuthAppsParams {
  workspaceId: string;
}

export function getIntegrationOAuthApps(params: IntegrationOAuthAppsParams) {
  const querySet: Record<string, Primitive> = { ...params };

  return ajaxGet({
    url: '/api/v1/integration_oauth',
    query: querySet,
  });
}

export function useGetIntegrationOAuthApps(
  queryParams: IntegrationOAuthAppsParams,
): UseQueryResult<IntegrationAccount[], XHRErrorResponse> {
  return useQuery(
    [GetIntegrationOAuthApps],
    () => getIntegrationOAuthApps(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
