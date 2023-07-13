/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const BlockSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    parent_id: {
      type: 'string',
      default: '',
    },
    block_type: {
      type: 'string',
      default: '',
    },
    content: {
      type: 'array',
      default: [],
      items: [
        {
          annotations: {
            type: 'array',
            default: [],
            items: [
              {
                properties: {
                  bold: {
                    type: 'string',
                    default: '',
                  },
                  italic: {
                    type: 'string',
                    default: '',
                  },
                  strikethrough: {
                    type: 'string',
                    default: '',
                  },
                  underline: {
                    type: 'string',
                    default: '',
                  },
                  code: {
                    type: 'string',
                    default: '',
                  },
                  type: {
                    type: 'string',
                    default: '',
                  },
                },
                required: ['block_type'],
              },
            ],
          },
          plain_text: {
            type: 'string',
            default: '',
          },
          href: {
            type: 'string',
            default: '',
          },
        },
      ],
    },
    children: {
      type: 'array',
      default: [],
    },
  },
};

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

export const enum BlockType {
  bookmark,
  breadcrumb,
  bulleted_list_item,
  callout,
  child_database,
  child_page,
  column,
  column_list,
  divider,
  embed,
  equation,
  file,
  heading_1,
  heading_2,
  heading_3,
  image,
  link_preview,
  link_to_page,
  numbered_list_item,
  paragraph,
  pdf,
  quote,
  synced_block,
  table,
  table_of_contents,
  table_row,
  template,
  to_do,
  toggle,
  unsupported,
  video,
}
