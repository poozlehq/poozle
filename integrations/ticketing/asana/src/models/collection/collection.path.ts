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
      
    /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const url = `<---- BASE URL ---->`;

    return this.fetchSingleCollection(url, headers, params);
  }
}
