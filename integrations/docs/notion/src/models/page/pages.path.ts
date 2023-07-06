/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Page, Meta, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertBlock, convertPage } from './pages.utils';

const BASE_URL = 'https://api.notion.com/v1';
let next_cursor = '';

export class GetPagesPath extends BasePath {
  async fetchBlocks(url: string, headers: AxiosHeaders, params: Params): Promise<any> {
    const final_params = {
      ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
    };
    const response = await axios({ url, headers, params: final_params });
    const results = response.data.results;

    if (response.data.has_more) {
      const nextUrl = `${BASE_URL}/blocks`;
      params.queryParams.cursor = response.data.next_cursor;
      const nextResults = await this.fetchBlocks(nextUrl, headers, params);
      return [...results, ...nextResults];
    }

    return results;
  }

  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    // const page = typeof params.queryParams?.cursor === 'string' ? params.queryParams?.cursor : '';
    // const final_params = {
    //   maxResults: params.queryParams?.limit,
    //   ...(page && { pageToken: page }),
    //   ...(params.queryParams?.labels && { labels: params.queryParams?.labels }),
    //   ...(params.queryParams?.direction && {
    //     orderBy: params.queryParams?.direction === 'asc' ? 'oldest' : 'newest',
    //   }),
    // };
    const pagesResponse = await axios.post(
      url,
      {
        query: '',
        filter: {
          value: 'page',
          property: 'object',
        },
        page_size: 10,
        // sort: {
        //   direction: 'ascending',
        //   timestamp: 'last_edited_time',
        // },
      },
      { headers },
    );

    next_cursor = pagesResponse.data.next_cursor;
    return Promise.all(
      pagesResponse.data.results?.map(async (data: any) => {
        const page = convertPage(data);
        const blockUrl = `${BASE_URL}/blocks/${data.id.replace(/-/g, '')}/children`;
        const blockResponse = await this.fetchBlocks(blockUrl, headers, params);
        page.body = blockResponse ? ((await convertBlock(blockResponse)) as []) : [];
        return page;
      }),
    );
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
    switch (method) {
      case 'GET':
        const url = `${BASE_URL}/search`;
        return this.fetchData(url, headers, params);

      // case 'POST':
      //   const url = `${BASE_URL}/send`;
      //   return this.sendEmail(url, headers, params);

      default:
        return [];
    }
  }
}
