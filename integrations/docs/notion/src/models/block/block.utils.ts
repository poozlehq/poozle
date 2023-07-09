/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Block, Content, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

export const BASE_URL = 'https://api.notion.com/v1';

export interface BlockResponse {
  object: string;
  id: string;
  parent: Record<string, string>;
  created_time: string;
  last_edited_time: string;
  created_by: Record<string, string>;
  last_edited_by: Record<string, string>;
  has_children: boolean;
  archived: boolean;
  type: string;
  [key: string]: any;
  children?: BlockResponse[];
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
): Promise<BlockResponse[]> {
  const final_params = {
    ...(params.queryParams?.cursor ? { start_cursor: params.queryParams?.cursor } : {}),
  };
  const response = await axios({ url, headers, params: final_params });
  let results = response.data.results;

  if (response.data.has_more) {
    const page_id = params.queryParams?.page_id as string;
    const nextUrl = `${BASE_URL}/blocks/${page_id.replace(/-/g, '')}/children`;
    params.queryParams.cursor = response.data.next_cursor;
    const nextResults = await fetchPageBlocks(nextUrl, headers, params);
    return [...results, ...nextResults];
  }

  results = await Promise.all(
    results?.map(async (block: BlockResponse) => {
      if (block.has_children) {
        const childUrl = `${BASE_URL}/blocks/${block.id.replace(/-/g, '')}/children`;
        const children = await fetchPageBlocks(childUrl, headers, params);
        return { ...block, children };
      }
      return block;
    }),
  );

  return results;
}

export async function extractBlockData(data: BlockResponse): Promise<any> {
  const type = data.type;
  const content = data[type].rich_text?.map((richtext: any) => {
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
  const children = data.children
    ? await Promise.all(
        data.children?.map(async (data: BlockResponse) => {
          return await extractBlockData(data);
        }),
      )
    : [];

  const block_data = {
    id: data.id,
    parent_id: data.parent?.id,
    block_type: data.type,
    content,
    children,
    raw_data: data,
  };
  return block_data;
}
