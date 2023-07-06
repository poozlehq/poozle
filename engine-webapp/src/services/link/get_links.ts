/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

import { LinkResponse } from './link.interface';

/**
 * Query Key for Get user.
 */
export const GetLinks = 'getLinks';

interface LinksParams {
  workspaceId: string;
}

export function getLinks(params: LinksParams) {
  const querySet: Record<string, Primitive> = { ...params };

  return ajaxGet({
    url: '/api/v1/link',
    query: querySet,
  });
}

export function useGetLinksQuery(
  queryParams: LinksParams,
): UseQueryResult<LinkResponse[], XHRErrorResponse> {
  return useQuery([GetLinks], () => getLinks(queryParams), {
    notifyOnChangeProps: 'tracked',
    retry: 1,
    refetchOnWindowFocus: false, // Frequency of Change would be Low
  });
}
