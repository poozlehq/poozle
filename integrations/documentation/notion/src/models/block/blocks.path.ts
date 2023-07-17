/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Block, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import {
  BASE_URL,
  BlockResponse,
  convertAppendBody,
  convertUpdateBody,
  extractBlockData,
  fetchPageBlocks,
  SingleBlockResponse,
} from './block.utils';

export class BlocksPath extends BasePath {
  async getBlocks(url: string, headers: AxiosHeaders, params: Params) {
    const block_id = params.pathParams?.parent_id as string;
    url += `/${block_id}/children`;
    const { blocks, meta } = (await fetchPageBlocks(url, headers, params)) as BlockResponse;

    return {
      data: blocks.map((blockData: SingleBlockResponse) => ({
        ...extractBlockData(blockData),
      })),
      raw: blocks,
      meta: {
        next_cursor: meta.next_cursor,
      },
    };
  }

  async createBlock(url: string, headers: AxiosHeaders, params: Params) {
    url += `/${params.pathParams?.parent_id}/children`;
    const body = convertAppendBody(params.requestBody?.data as Block[]);

    const block_response = await axios.patch(url, body, { headers });

    return {
      data: block_response.data.results.map((blockData: SingleBlockResponse) => {
        return extractBlockData(blockData);
      }),
      raw: block_response.data.results,
    };
  }

  async updateBlock(url: string, headers: AxiosHeaders, params: Params) {
    try {
      url += `/${params.pathParams?.block_id}`;
      const body = convertUpdateBody(params.requestBody as Block);
      const response = await axios.patch(url, body, { headers });

      return {
        data: extractBlockData(response.data),
        raw: response,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/blocks`;

    switch (method) {
      case 'GET':
        return this.getBlocks(url, headers, params);

      case 'POST':
        return this.createBlock(url, headers, params);

      case 'PATCH':
        return this.updateBlock(url, headers, params);

      default:
        return {};
    }
  }
}
