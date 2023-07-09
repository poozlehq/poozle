/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const PageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    parent_id: {
      type: 'string',
      dafault: '',
    },
    body: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            block_type: {
              type: 'string',
              default: '',
            },
            plain_text: {
              type: 'string',
              default: '',
            },
            href: {
              type: 'string',
              default: '',
            },
            annotations: {
              type: 'object',
              propertirs: {
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
                color: {
                  type: 'string',
                  default: '',
                },
              },
            },
          },
          required: ['block_type'],
        },
      ],
    },
    created_by: {
      type: 'string',
      default: '',
    },
    title: {
      type: 'string',
      default: '',
    },
    created_at: {
      type: 'string',
      default: '',
    },
    updated_at: {
      type: 'string',
      default: '',
    },
  },
};

export interface Page {
  id: string;
  parent_id: string;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

export interface createPage {
  parent_id: string;
  title: string;
}
