/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CollectionResponse } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionPath extends BasePath {
  async fetchSingleCollection(
    url: string,
    headers: AxiosHeaders,
    params: Params,
  ): Promise<CollectionResponse> {
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

      return { data: convertCollection(response.data), raw: response.data };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}`;

    return this.fetchSingleCollection(url, headers, params);
  }
}
