/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Block, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { getBlockData } from './block.utils';

export class BlocksPath extends BasePath {
  async getBlocks(url: string, headers: AxiosHeaders, params: Params) {
    const block_id = params.pathParams?.parent_id as string;
    url += `/${block_id}`;

    console.log(url, headers);

    const final_params = {
      'body-format': 'atlas_doc_format',
    };

    const response = await axios({ url, headers, params: final_params });

    const dataContent = JSON.parse(response.data.body.atlas_doc_format.value).content;

    console.log(dataContent);

    // let blockData: Block[] = [];
    // dataContent.forEach((content: any) => {
    //   blockData = [...blockData, ...getBlockData(content)];
    // });

    let blockData: Block[] = [];
    dataContent.forEach((content: any) => {
      const blocks = getBlockData(content);
      const blocksWithRaw = blocks.map((block) => ({ ...block, raw: content }));
      blockData = [...blockData, ...blocksWithRaw];
    });

    return {
      data: blockData,
      meta: {},
    };
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const BASE_URL = `https://${config.confluence_domain}/wiki/api/v2`;

    const url = `${BASE_URL}/pages`;

    console.log(headers);

    switch (method) {
      case 'GET':
        return this.getBlocks(url, headers, params);

      default:
        return {};
    }
  }
}
