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

export interface ConfluenceType {
  [key: string]: BlockType;
}
export const confluenceType: ConfluenceType = {
  paragraph: BlockType.paragraph,
  bulletList: BlockType.bulleted_list_item,
  codeBlock: BlockType.code,
  mediaSingle: BlockType.file,
  orderedList: BlockType.numbered_list_item,
  extension: BlockType.unsupported,
  table: BlockType.table,
  tableRow: BlockType.table_row,
  tableHeader: BlockType.table_header,
  tableCell: BlockType.table_cell,
  inlineCard: BlockType.inline_card,
  text: BlockType.text,
  blockCard: BlockType.block_card,
  listItem: BlockType.list_item,
  nestedExpand: BlockType.toggle,
  expand: BlockType.toggle,
  heading: BlockType.heading_1,
  heading_1: BlockType.heading_1,
  heading_2: BlockType.heading_2,
  heading_3: BlockType.heading_3,
  heading_4: BlockType.heading_4,
  heading_5: BlockType.heading_5,
  heading_6: BlockType.heading_6,
  date: BlockType.date,
  blockquote: BlockType.quote,
};
