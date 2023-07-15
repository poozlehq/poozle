/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const BASE_URL = 'https://api.notion.com/v1';

export function convertPages(pageData: any) {
  const titleKey = Object.keys(pageData.properties).find(
    (key) => pageData.properties[key].id === 'title',
  );

  return {
    id: pageData.id.replace(/-/g, ''),
    parent_id: pageData.parent[pageData.parent?.type] || '',
    title: titleKey ? pageData.properties[titleKey].title[0]?.plain_text : '',
    created_by: pageData.created_by.id,
    created_at: pageData.created_time,
    updated_at: pageData.last_edited_time,
    updated_by: pageData.last_edited_by.id,
    raw_data: pageData,
  };
}

export function convertBlockPage(pageData: any) {
  return {
    id: pageData.id.replace(/-/g, ''),
    type: pageData.type,
    title: pageData[pageData.type].title,
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
