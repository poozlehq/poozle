/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationOAuthApps = 'getIntegrationOAuthApps';
export const GetIntegrationOAuthAppsJustIds = 'getIntegrationOAuthAppsJustIds';

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

export function getIntegrationOAuthAppsJustIds(
  params: IntegrationOAuthAppsParams,
) {
  const querySet: Record<string, Primitive> = { ...params };

  return ajaxGet({
    url: '/api/v1/integration_oauth_just_ids',
    query: querySet,
  });
}

export function useGetIntegrationOAuthApps(
  queryParams: IntegrationOAuthAppsParams,
): UseQueryResult<IntegrationOAuthApp[], XHRErrorResponse> {
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

export function useGetIntegrationOAuthAppsJustIds(
  queryParams: IntegrationOAuthAppsParams,
): UseQueryResult<IntegrationOAuthApp[], XHRErrorResponse> {
  return useQuery(
    [GetIntegrationOAuthAppsJustIds],
    () => getIntegrationOAuthAppsJustIds(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
