/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition.entity';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationDefinition = 'getIntegrationDefinition';

interface IntegrationDefinitionParams {
  integrationDefinitionId: string;
}

export function getIntegrationDefinition(params: IntegrationDefinitionParams) {
  return ajaxGet({
    url: `/api/v1/integration_definition/${params.integrationDefinitionId}`,
  });
}

export function useGetIntegrationDefinitionQuery(
  queryParams: IntegrationDefinitionParams,
): UseQueryResult<IntegrationDefinition, XHRErrorResponse> {
  return useQuery(
    [GetIntegrationDefinition],
    () => getIntegrationDefinition(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
