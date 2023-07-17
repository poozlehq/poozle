/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

// import { BASE_URL, convertBlock, convertPage, fetchPageBlocks } from './pages.utils';
import { BASE_URL, convertPages } from './pages.utils';

export class PagesPath extends BasePath {
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

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: pagesResponse.data.results?.map((data: any) => {
        return convertPages(data);
      }),
      meta: {
        has_more: pagesResponse.data.has_more,
        next_cursor: pagesResponse.data.has_more ? pagesResponse.data.next_cursor : '',
      },
    };
  }

  async createPage(url: string, headers: AxiosHeaders, params: Params) {
    const body = {
      parent: { page_id: params.requestBody?.parent_id },
      properties: {
        title: [
          {
            text: {
              content: params.requestBody?.title,
            },
          },
        ],
      },
    };

    const response = await axios.post(url, body, { headers });

    return convertPages(response.data);
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
