/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

/**
 * Query Key for Get user.
 */
export const GetIntegrationDefinitionSpec = 'getIntegrationDefinitionSpec';

export interface AuthSpecificationGeneric {
  inputSpecification?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
  };
  headers?: Record<string, string>;
}

export interface AuthSpecificationOAuth {
  tokenUrl?: string;
  authMode?: string;
  authorizationUrl?: string;
  authorizationParams?: Record<string, string>;
  tokenParams?: Record<string, string>;
  headers?: Record<string, string>;
}

export type AuthSupported = string[];

export interface Specification {
  authSupported: AuthSupported;
  authSpecification: Record<
    string,
    AuthSpecificationGeneric | AuthSpecificationOAuth
  >;
  supportedFilters: string[];
  supportedSortBy: string[];
}

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
    [GetIntegrationDefinitionSpec],
    () => getIntegrationDefinitionSpec(queryParams),
    {
      notifyOnChangeProps: 'tracked',
      retry: 1,
      refetchOnWindowFocus: false, // Frequency of Change would be Low
    },
  );
}
