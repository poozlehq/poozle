/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationOAuth = 'getIntegrationOAuth';

interface IntegrationOAuthsParams {
  integrationOAuthAppId: string;
  workspaceId: string;
}

export function getIntegrationOAuth(params: IntegrationOAuthsParams) {
  return ajaxGet({
    url: `/api/v1/integration_oauth/${params.integrationOAuthAppId}?workspaceId=${params.workspaceId}`,
  });
}

export function useGetIntegrationOAuthQuery(
  queryParams: IntegrationOAuthsParams,
): UseQueryResult<IntegrationOAuthApp, XHRErrorResponse> {
  return useQuery(
    [GetIntegrationOAuth],
    () => getIntegrationOAuth(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
