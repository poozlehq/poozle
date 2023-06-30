/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Collection, Config, Meta, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertCollection } from './collection.utils';

const BASE_URL = 'https://api.github.com';

export class GetCollectionsPath extends BasePath {
  async getMetaParams(_data: Collection[], params: Params): Promise<Meta> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: (page > 1 ? page - 1 : 1).toString(),
        current: page.toString(),
        next: (page + 1).toString(),
      },
    };
  }

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<Partial<Collection[]>> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((data: any) => convertCollection(data));
  }
}
