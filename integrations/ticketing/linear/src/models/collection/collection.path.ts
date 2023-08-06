/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CollectionResponse } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionPath extends BasePath {
  async fetchSingleCollection(
    headers: AxiosHeaders,
    params: Params,
  ): Promise<CollectionResponse> {
    try {
      const response = await axios({
        url,
        headers,
      });

      return { data: convertCollection(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, _config: Config) {

    return this.fetchSingleCollection( headers, params);
  }
}
