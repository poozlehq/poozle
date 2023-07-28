/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, BlockType, Content, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { BlockWithRaw, SingleBlockResponse } from './block.interface';

export const BASE_URL = 'https://api.notion.com/v1';

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

export async function fetchBlockChildren(
  block: SingleBlockResponse,
  headers: AxiosHeaders,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const childUrl = `${BASE_URL}/blocks/${block.id.replace(/-/g, '')}/children`;

  const params = {
    page_size: 100,
  };

  const response = await axios({ url: childUrl, headers, params });
  let results = response.data.results;
  let has_more = response.data.has_more;
  let next_cursor = response.data.has_more ? response.data.next_cursor : '';

  while (has_more) {
    const next_response = await axios({
      url: childUrl,
      headers,
      params: {
        start_cursor: next_cursor,
      },
    });

    results = results.concat(next_response.data.results);

    has_more = next_response.data.has_more;
    next_cursor = next_response.data.has_more ? next_response.data.next_cursor : '';
  }

  results = await Promise.all(
    results?.map(async (block: SingleBlockResponse) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block, headers);
        return { ...block, children: children.blocks };
      }

      return block;
    }),
  );

  return {
    blocks: results,
  };
}

export async function fetchPageBlocks(url: string, headers: AxiosHeaders, params: Params) {
  const limit = params.queryParams?.limit ? parseInt(params.queryParams?.limit.toString()) : 10;

  const final_params = {
    page_size: limit,
    ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
  };

  const response = await axios({ url, headers, params: final_params });
  let results = response.data.results;

  results = await Promise.all(
    results?.map(async (block: SingleBlockResponse) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block, headers);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractContent(data: any): Content[] {
  const type = data.type;
  switch (type) {
    case BlockType.equation:
      return [
        {
          plain_text: data[type].expression,
        },
      ] as Content[];

    case BlockType.video:
    case BlockType.image:
    case BlockType.file:
    case BlockType.pdf:
      const contentType = data[type].type;
      return [
        {
          href: data[type][contentType]?.url,
        },
      ] as Content[];

    case BlockType.bookmark:
      return [
        {
          href: data[type].url,
        },
      ] as Content[];

    case BlockType.table_row:
      return [];

    default:
      return 'rich_text' in data[type]
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data[type]?.rich_text?.map((richtext: any) => {
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
          })
        : [];
  }
}

export function extractChildrenData(data: SingleBlockResponse): Block[] {
  if (data.type === BlockType.table_row) {
    const cells = data[data.type].cells ? data[data.type].cells : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cells.map((cell: any) => ({
      id: data.id,
      parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
      block_type: BlockType.table_cell,
      content: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...cell?.map((richtext: any) => ({
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
        })),
      ],
      children: [],
    })) as Block[];
  }

  const caption = data[data.type].caption ? data[data.type].caption : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return caption.map((richtext: any) => ({
    id: data.id,
    parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
    block_type: BlockType.bookmark_text,
    content: [
      {
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
      },
    ],
    children: [],
  }));
}

export function extractBlockData(data: SingleBlockResponse): BlockWithRaw {
  const content = extractContent(data);

  let children: Block[] = [];

  if (data.type === BlockType.table_row || data.type === BlockType.bookmark) {
    children = extractChildrenData(data);
  } else {
    children = data.children
      ? data.children?.map((data: SingleBlockResponse) => {
          const childrenData = extractBlockData(data);
          delete childrenData['raw'];

          return childrenData;
        })
      : [];
  }

  const block_data = {
    id: data.id,
    parent_id: data.parent?.type ? data.parent[data.parent.type] : '',
    block_type: data.type,
    content,
    children,

    // Raw
    raw: data,
  };

  return block_data;
}
