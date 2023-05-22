/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useGenericAuth } from '@envelop/generic-auth';
import {
  MeshPlugin,
  OnFetchHookDone,
  OnFetchHookPayload,
  OnFetchHookDonePayload,
} from '@graphql-mesh/types';
import { fetch } from '@whatwg-node/fetch';
import * as queryString from 'qs';

import { resolveUserFn, validateUser } from './authPlugin';
import { getAuthHeadersAndQueryParams } from './utils';

const myPlugin: MeshPlugin<any> = {
  onFetch: async (
    params: OnFetchHookPayload<any>,
  ): Promise<OnFetchHookDone> => {
    const { headers, queryParams } = await getAuthHeadersAndQueryParams(
      params.options,
    );

    const fetchFunction = async (
      url: string,
      options?: RequestInit,
    ): Promise<Response> => {
      let finalURL = url;

      if (Object.keys(queryParams).length > 0) {
        const justURL = url.split('?')[0];
        const searchParams = queryString.parse(url.split('?')[1]);

        const finalQueryParams = queryString.stringify({
          ...searchParams,
          ...queryParams,
        });

        const urlSearchParams = new URLSearchParams(finalQueryParams);

        finalURL = `${justURL}?${urlSearchParams}`;
      }

      return fetch(finalURL, {
        ...options,
        headers: {
          ...options.headers,
          ...headers,
        },
      });
    };

    params.setFetchFn(fetchFunction);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ({ response, setResponse }: OnFetchHookDonePayload) => {
      setResponse(response);
    };
  },
};

const plugins = [
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: 'protect-all',
  }),
  myPlugin,
];

export default plugins;
