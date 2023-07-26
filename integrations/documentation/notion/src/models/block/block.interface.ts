/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, BlockType } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface BlockWithRaw extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface BlocksResponse {
  data: BlockWithRaw[];
  meta: Meta;
}

export interface BlockResponse {
  data: BlockWithRaw;
}

export interface BlocksParams {
  queryParams: {
    cursor?: string;
  };

  pathParams: {
    parent_id: string;
  };
}

export interface CreateBlockParams {
  pathParams: {
    parent_id: string;
  };

  requestBody: {
    data: Block[];
  };
}

export interface UpdateBlockParams {
  pathParams: {
    block_id: string;
  };

  requestBody: Block;
}

export interface SingleBlockResponse {
  object: string;
  id: string;
  parent: Record<string, string>;
  created_time: string;
  last_edited_time: string;
  created_by: Record<string, string>;
  last_edited_by: Record<string, string>;
  has_children: boolean;
  archived: boolean;
  type: BlockType;

  // TODO (harshith): fix the types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  children?: SingleBlockResponse[];
}
