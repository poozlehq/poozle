/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function convertPage(pageData: any) {
  const parentKey = Object.keys(pageData.properties).find(
    (key) => pageData.properties[key].id === 'title',
  );
  return {
    id: pageData.id,
    body: [],
    title: parentKey ? pageData.properties[parentKey].title[0].plain_text : '',
    created_by: pageData.created_by.id,
    created_at: pageData.created_time,
    updated_at: pageData.last_edited_time,
    updated_by: pageData.last_edited_by.id,
    raw_data: pageData,
  };
}

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
  paragraph?: Record<string, string | string[]>;
}

export interface Block {
  block_type: string;
  annotations: {
    bold: string;
    italic: string;
    strikethrough: string;
    underline: string;
    code: string;
    color: string;
  };
  plain_text: string;
  href: null;
}

async function extractData(data: any) {
  const type = data.type;

  return data[type].rich_text?.map((richtext: any) => {
    return {
      block_type: type,
      annotations: {
        bold: richtext.annotations.bold,
        italic: richtext.annotations.italic,
        strikethrough: richtext.annotations.strikethrough,
        underline: richtext.annotations.underline,
        code: richtext.annotations.code,
        color: richtext.annotations.color,
      },
      plain_text: richtext.plain_text,
      href: richtext.href,
    };
  });
}

export function convertBlock(blockData: any) {
  return Promise.all(
    blockData.map(async (block: any) => {
      return await extractData(block);
    }),
  );
}
