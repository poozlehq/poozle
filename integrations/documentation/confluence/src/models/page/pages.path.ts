/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getMetaParams } from 'common';
import { PagesParams } from './page.interface';

// import { BASE_URL, convertBlock, convertPage, fetchPageBlocks } from './pages.utils';
import { convertPage } from './pages.utils';

export class PagesPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: PagesParams) {
    const cursor = params.queryParams?.cursor ?? '';
    const finalParams = {
      limit: params.queryParams?.limit,
      ...(params.queryParams?.title ? { title: params.queryParams?.title } : {}),
      ...(cursor ? { cursor } : {}),
      ...(params.queryParams?.direction === 'asc'
        ? { sort: params.queryParams?.sort === 'created_at' ? 'created-date' : 'modified-date' }
        : {
            sort: params.queryParams?.sort === 'created_at' ? '-created-date' : '-modified-date',
          }),
    };

    const pagesResponse = await axios({
      url,
      headers,
      params: finalParams,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: pagesResponse.data.results?.map((data: any) => {
        return convertPage(data);
      }),
      meta: getMetaParams(pagesResponse.data, cursor),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: PagesParams, config: Config) {
    let url = '';
    const BASE_URL = await getBaseUrl(config, headers);
    switch (method) {
      case 'GET':
        url = `${BASE_URL}/pages`;
        return this.fetchData(url, headers, params);

      default:
        return [];
    }
  }
}
