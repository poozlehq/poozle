/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Content {
  annotations: {
    bold: string;
    italic: string;
    strikethrough: string;
    underline: string;
    code: string;
    color: string;
  };
  plain_text: string;
  href: string;
}

export interface Block {
  id: string;
  parent_id: string;
  block_type: BlockType;
  content: Content[];
  children: Block[];
}

export enum BlockType {
  bookmark = 'bookmark',
  breadcrumb = 'breadcrumb',
  bulleted_list_item = 'bulleted_list_item',
  callout = 'callout',
  child_database = 'child_database',
  child_page = 'child_page',
  column = 'column',
  column_list = 'column_list',
  divider = 'divider',
  embed = 'embed',
  equation = 'equation',
  file = 'file',
  heading_1 = 'heading_1',
  heading_2 = 'heading_2',
  heading_3 = 'heading_3',
  image = 'image',
  link_preview = 'link_preview',
  link_to_page = 'link_to_page',
  numbered_list_item = 'numbered_list_item',
  paragraph = 'paragraph',
  pdf = 'pdf',
  quote = 'quote',
  synced_block = 'synced_block',
  table = 'table',
  table_of_contents = 'table_of_contents',
  table_row = 'table_row',
  template = 'template',
  to_do = 'to_do',
  toggle = 'toggle',
  unsupported = 'unsupported',
  video = 'video',
}
