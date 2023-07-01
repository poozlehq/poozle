/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseQueryResult, useQuery } from 'react-query';
import { XHRErrorResponse, ajaxGet } from 'utils';

import { User } from 'store/user_context';

/**
 * Query Key for Get user.
 */
export const GetUserQuery = 'getUserQuery';

export function getUser() {
  return ajaxGet({
    url: '/api/v1/user',
  });
}

export function useGetUserQuery(): UseQueryResult<User, XHRErrorResponse> {
  return useQuery([GetUserQuery], () => getUser(), {
    retry: 1,
    staleTime: 1,
    refetchOnWindowFocus: false, // Frequency of Change would be Low
  });
}
