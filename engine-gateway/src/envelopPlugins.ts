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

import { resolveUserFn, validateUser } from './authPlugin';
import { getAuthHeades } from './utils';

const myPlugin: MeshPlugin<any> = {
  onFetch: async (
    params: OnFetchHookPayload<any>,
  ): Promise<OnFetchHookDone> => {
    const headers = await getAuthHeades(params.url, params.options);
    const fetchFunction = async (
      url: string,
      options?: RequestInit,
    ): Promise<Response> => {
      return fetch(url, {
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
