/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { CollectionsResponse, GetCollectionsParams } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionsPath extends BasePath {
  async run(
    _method: string,
    headers: AxiosHeaders,
    params: GetCollectionsParams,
    config: Config,
  ): Promise<CollectionsResponse> {
    const page = params.queryParams?.cursor ? parseInt(params.queryParams?.cursor) : 1;

    const final_params = {
      per_page: params.queryParams?.limit,
      sort:
        params.queryParams?.sort === 'created_at'
          ? 'created'
          : params.queryParams?.sort === 'updated_at'
          ? 'updated'
          : '',
      direction: params.queryParams?.direction,
      page,
    };

    const response = await axios({
      url: `${BASE_URL}/orgs/${config.org}/repos`,
      headers,
      params: final_params,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.map((data: any) => convertCollection(data)),
      meta: getMetaParams(response.data, params.queryParams?.limit, page),
    };
  }
}
