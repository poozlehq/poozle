/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Block, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import {
  BlocksParams,
  BlocksResponse,
  CreateBlockParams,
  SingleBlockResponse,
  UpdateBlockParams,
} from './block.interface';
import {
  BASE_URL,
  convertAppendBody,
  convertUpdateBody,
  extractBlockData,
  fetchPageBlocks,
} from './block.utils';

export class BlocksPath extends BasePath {
  async getBlocks(
    url: string,
    headers: AxiosHeaders,
    params: BlocksParams,
  ): Promise<BlocksResponse> {
    const block_id = params.pathParams?.parent_id as string;
    url += `/${block_id}/children`;
    const { blocks, meta } = await fetchPageBlocks(url, headers, params);

    return {
      data: blocks.map((blockData: SingleBlockResponse) => ({
        ...extractBlockData(blockData),
      })),
      meta: {
        previous: '',
        current: params.queryParams?.cursor ? params.queryParams?.cursor : '',
        next: meta.has_more ? meta.next_cursor : '',
      },
    };
  }

  async createBlocks(url: string, headers: AxiosHeaders, params: CreateBlockParams) {
    url += `/${params.pathParams?.parent_id}/children`;

    const body = convertAppendBody(params.requestBody.data);

    const block_response = await axios.patch(url, body, { headers });

    return {
      data: block_response.data.results.map((blockData: SingleBlockResponse) => {
        return extractBlockData(blockData);
      }),
    };
  }

  async updateBlock(url: string, headers: AxiosHeaders, params: UpdateBlockParams) {
    try {
      url += `/${params.pathParams?.block_id}`;
      const body = convertUpdateBody(params.requestBody as Block);
      const response = await axios.patch(url, body, { headers });

      return {
        data: extractBlockData(response.data),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: BlocksParams | CreateBlockParams | UpdateBlockParams,
    _config: Config,
  ) {
    const url = `${BASE_URL}/blocks`;

    switch (method) {
      case 'GET':
        return this.getBlocks(url, headers, params as BlocksParams);

      case 'POST':
        return this.createBlocks(url, headers, params as CreateBlockParams);

      case 'PATCH':
        return this.updateBlock(url, headers, params as UpdateBlockParams);

      default:
        throw new Error(`Unknown method ${method}`);
    }
  }
}
