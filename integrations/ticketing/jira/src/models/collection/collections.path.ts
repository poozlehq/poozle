/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Collection, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getMetaParams } from 'common';

import { FetchCollectionsParams } from './collection.interface';
import { convertCollection } from './collection.utils';

function paginate(array: Collection[], page_size: number, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export class CollectionsPath extends BasePath {
  async fetchCollections(url: string, headers: AxiosHeaders, params: FetchCollectionsParams) {
    const page = params.queryParams.cursor ? parseInt(params.queryParams.cursor) : 1;

    const response = await axios({
      url,
      headers,
    });

    const data = paginate(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.data.map((data: any) => convertCollection(data)),
      params.queryParams.limit as number,
      page,
    );

    return {
      data,
      meta: getMetaParams(data, params.queryParams.limit as number, page),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: FetchCollectionsParams, config: Config) {
    const baseURL = await getBaseUrl(config, headers);

    const url = `${baseURL}/project`;
    switch (method) {
      case 'GET':
        return this.fetchCollections(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
