/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Collection, Config, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertCollection } from './collection.utils';

const BASE_URL = 'https://api.github.com';

export class GetCollectionsPath extends BasePath {
  async fetchSingleCollection(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<Partial<Collection>> {
    try {
      const page =
        typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

      const response = await axios({
        url,
        headers,
        params: {
          per_page: params.queryParams?.limit,
          page,
        },
      });

      return convertCollection(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<Partial<Collection>> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}`;

    return this.fetchSingleCollection(url, headers, params);
  }
}
