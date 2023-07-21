/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CollectionResponse, GetCollectionParams } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionPath extends BasePath {
  async fetchSingleCollection(url: string, headers: AxiosHeaders): Promise<CollectionResponse> {
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

  async run(_method: string, headers: AxiosHeaders, params: GetCollectionParams, config: Config) {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}`;

    return this.fetchSingleCollection(url, headers);
  }
}
