/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, BlockType, Content, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

export const BASE_URL = 'https://api.notion.com/v1';

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

export interface BlockResponse {
  blocks: SingleBlockResponse[];
  meta: {
    has_more: boolean;
    next_cursor: string;
  };
}

export function convertUpdateBody(data: Block) {
  return {
    [data.block_type]: {
      rich_text: data.content.map((contentData: Content) => {
        return {
          type: 'text',
          text: {
            content: contentData.plain_text,
            link: contentData.href ? { url: contentData.href } : null,
          },
        };
      }),
    },
  };
}

export function convertAppendBody(data: Block[]) {
  return {
    children: data.map((blockData: Block) => {
      return {
        object: 'block',
        type: blockData.block_type,
        [blockData.block_type]: {
          rich_text: blockData.content.map((contentData: Content) => {
            return {
              type: 'text',
              text: {
                content: contentData.plain_text,
                link: contentData.href ? { url: contentData.href } : null,
              },
            };
          }),
        },
      };
    }),
  };
}

export async function fetchPageBlocks(
  url: string,
  headers: AxiosHeaders,
  params: Params,
): Promise<BlockResponse> {
  const final_params = {
    ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
  };

  const response = await axios({ url, headers, params: final_params });
  let results = response.data.results;

  results = await Promise.all(
    results?.map(async (block: SingleBlockResponse) => {
      if (block.has_children) {
        const childUrl = `${BASE_URL}/blocks/${block.id.replace(/-/g, '')}/children`;
        const children = await fetchPageBlocks(childUrl, headers, params);

        return { ...block, children: children.blocks };
      }

      return block;
    }),
  );

  return {
    blocks: results,
    meta: {
      has_more: response.data.has_more,
      next_cursor: response.data.has_more ? response.data.next_cursor : '',
    },
  };
}

export function extractContent(data: any): Content | Content[] {
  const type = data.type;
  switch (type) {
    case BlockType.equation:
      return {
        plain_text: data[type].expression,
      } as Content;

    case BlockType.video:
    case BlockType.image:
    case BlockType.file:
    case BlockType.pdf:
      const contentType = data[type].type
      return {
        href: data[type][contentType]?.url,
      } as Content;

    case BlockType.bookmark:
      return {
        href: data[type].url,
      } as Content;

    default:
      return data[type]?.rich_text?.map((richtext: any) => {
        return {
          annotations: {
            bold: richtext.annotations.bold ?? '',
            italic: richtext.annotations.italic ?? '',
            strikethrough: richtext.annotations.strikethrough ?? '',
            underline: richtext.annotations.underline ?? '',
            code: richtext.annotations.code ?? '',
            color: richtext.annotations.color ?? '',
          },
          plain_text: richtext.plain_text,
          href: richtext.href,
        };
      });
  }
}

export function extractBlockData(data: SingleBlockResponse): Block {
  const content = extractContent(data);

  const children = data.children
    ? data.children?.map((data: SingleBlockResponse) => extractBlockData(data))
    : [];

  const block_data = {
    id: data.id,
    parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
    block_type: data.type,
    content,
    children,
  };

  return block_data;
}
