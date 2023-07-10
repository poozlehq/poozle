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
      default: '',
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

export interface CreatePage {
  parent_id: string;
  title: string;
}
