/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const TicketSchema = {
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
    collection_id: {
      type: 'string',
      default: '',
    },
    type: {
      type: 'string',
      default: '',
    },
    subject: {
      type: 'string',
      default: '',
    },
    description: {
      type: 'string',
      default: '',
    },
    status: {
      type: 'string',
      default: '',
    },
    priority: {
      type: 'string',
      default: '',
    },
    ticket_url: {
      type: 'string',
      default: '',
    },
    assignees: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              default: '',
            },
            username: {
              type: 'string',
              default: '',
            },
          },
          required: ['id', 'username'],
        },
      ],
    },
    updated_at: {
      type: 'string',
      default: '',
    },
    created_at: {
      type: 'string',
      default: '',
    },
    created_by: {
      type: 'string',
      default: '',
    },
    due_date: {
      type: 'string',
      default: '',
    },
    completed_at: {
      type: 'string',
      default: '',
    },
    tags: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              default: '',
            },
            name: {
              type: 'string',
              default: '',
            },
          },
          required: ['id', 'name'],
        },
      ],
    },
  },
};
