/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities/integrationDefinition.entity';
import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationDefinitions = 'getIntegrationDefinitions';

interface IntegrationDefinitionsParams {
  workspaceId: string;
  category?: string[];
}

export function getIntegrationDefinitions(
  params: IntegrationDefinitionsParams,
) {
  const querySet: Record<string, Primitive> = {
    workspaceId: params.workspaceId,
    category: params.category ? params.category.join(',') : '',
  };

  return ajaxGet({
    url: `/api/v1/integration_definition`,
    query: querySet,
  });
}

export function useGetIntegrationDefinitionsQuery(
  queryParams: IntegrationDefinitionsParams,
): UseQueryResult<IntegrationDefinition[], XHRErrorResponse> {
  return useQuery(
    [GetIntegrationDefinitions, queryParams],
    () => getIntegrationDefinitions(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
