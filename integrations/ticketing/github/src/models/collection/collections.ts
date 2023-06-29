/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Collection, Config, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

import { convertCollection } from './collection.utils';

const BASE_URL = 'https://api.github.com';

export class GetCollectionsPath extends BasePath {
  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<Partial<Collection[]>> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const response = await axios({
      url: `${BASE_URL}/orgs/${config.org}/repos`,
      headers,
      params: {
        per_page: params.queryParams?.limit,
        page,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.map((data: any) => convertCollection(data));
  }
}
