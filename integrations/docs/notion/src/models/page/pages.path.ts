/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Page, Meta, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

// import { BASE_URL, convertBlock, convertPage, fetchPageBlocks } from './pages.utils';
import { BASE_URL, convertPage } from './pages.utils';

let next_cursor = '';

export class GetPagesPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    const pagesResponse = await axios.post(
      url,
      {
        query: params.queryParams?.title ?? '',
        filter: {
          value: 'page',
          property: 'object',
        },
        page_size: 10,
        ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
        ...(params.queryParams?.direction === 'asc'
          ? {
              sort: {
                direction: 'ascending',
                timestamp:
                  params.queryParams?.sort === 'created_at' ? 'created_time' : 'last_edited_time',
              },
            }
          : {
              sort: {
                direction: 'descending',
                timestamp:
                  params.queryParams?.sort === 'created_at' ? 'created_time' : 'last_edited_time',
              },
            }),
      },
      { headers },
    );

    next_cursor = pagesResponse.data.next_cursor;
    return Promise.all(
      pagesResponse.data.results?.map((data: any) => {
        return convertPage(data);
      }),
    );
  }

  async createPage(url: string, headers: AxiosHeaders, params: Params) {
    const body = {
      parent: { pageId: params.requestBody?.parent_id },
      title: params.requestBody?.title,
    };

    const response = await axios.post(url, body, { headers });
    return convertPage(response.data);
  }

  async getMetaParams(_data: Page[], params: Params): Promise<Meta> {
    const page = typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';

    return {
      limit: params.queryParams?.limit as number,
      cursors: {
        before: '',
        current: page,
        next: next_cursor,
      },
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    let url = '';
    switch (method) {
      case 'GET':
        url = `${BASE_URL}/search`;
        return this.fetchData(url, headers, params);

      case 'POST':
        url = `${BASE_URL}/pages`;
        return this.createPage(url, headers, params);

      default:
        return [];
    }
  }
}
