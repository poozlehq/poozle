/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Block, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';
import { BlocksParams } from './block.interface';

import { getBlockData, processBlock } from './block.utils';

export class BlocksPath extends BasePath {
  async getBlocks(url: string, headers: AxiosHeaders, params: BlocksParams) {
    const block_id = params.pathParams?.parent_id as string;
    url += `/${block_id}`;

    const final_params = {
      'body-format': 'atlas_doc_format',
    };

    const response = await axios({ url, headers, params: final_params });

    const dataContent = JSON.parse(response.data.body.atlas_doc_format.value).content;

    let blockData: Block[] = [];
    dataContent.forEach((content: any) => {
      const blocks = getBlockData(content);
      const blocksWithRaw = blocks.map((block) =>
        processBlock(block, content, undefined, block_id),
      );
      blockData = [...blockData, ...blocksWithRaw];
    });

    return {
      data: blockData,
      meta: {},
    };
  }

  async run(method: string, headers: AxiosHeaders, params: BlocksParams, config: Config) {
    const BASE_URL = await getBaseUrl(config, headers);

    const url = `${BASE_URL}/pages`;

    switch (method) {
      case 'GET':
        return this.getBlocks(url, headers, params);

      default:
        return {};
    }
  }
}
