/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Specification } from '@poozle/engine-idk';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationDefinitionSpec = 'getIntegrationDefinitionSpec';

interface IntegrationDefinitionParams {
  integrationDefinitionId: string;
  workspaceId: string;
}

export function getIntegrationDefinitionSpec(
  params: IntegrationDefinitionParams,
) {
  const querySet: Record<string, Primitive> = {
    workspaceId: params.workspaceId,
  };

  return ajaxGet({
    url: `/api/v1/integration_definition/${params.integrationDefinitionId}/spec`,
    query: querySet,
  });
}

export function useGetIntegrationDefinitionSpecQuery(
  queryParams: IntegrationDefinitionParams,
): UseQueryResult<Specification, XHRErrorResponse> {
  return useQuery(
    [
      GetIntegrationDefinitionSpec,
      queryParams.integrationDefinitionId,
      queryParams.workspaceId,
    ],
    () => getIntegrationDefinitionSpec(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
