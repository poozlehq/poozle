/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

import { LinkResponse } from './link.interface';

/**
 * Query Key for Get user.
 */
export const GetLink = 'getLink';

interface LinksParams {
  linkId: string;
  accountIdentifier?: string;
}

export function getLink(params: LinksParams) {
  const baseLink = `/api/v1/link/${params.linkId}`;

  return ajaxGet({
    url: params.accountIdentifier
      ? `${baseLink}?accountIdentifier=${params.accountIdentifier}`
      : baseLink,
  });
}

export function useGetLinkQuery(
  queryParams: LinksParams,
): UseQueryResult<LinkResponse, XHRErrorResponse> {
  return useQuery([GetLink, queryParams], () => getLink(queryParams), {
    notifyOnChangeProps: 'tracked',
    retry: 1,
    refetchOnWindowFocus: false, // Frequency of Change would be Low
  });
}
