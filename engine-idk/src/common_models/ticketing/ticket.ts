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
    name: {
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

export interface Assignee {
  id: string;
  username: string;
}

export interface TicketTag {
  id: string;
  name: string;
}

export interface Ticket {
  id: string;
  parent_id: string;
  collection_id: string;
  type: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  ticket_url: string;
  assignees: Assignee[];
  updated_at: string;
  created_at: string;
  created_by: string;
  due_date: string;
  completed_at: string;
  tags: TicketTag[];
}

export interface CreateTicketBody {
  collection_id: string;
  name: string;
  description: string;
  assignees: Exclude<Assignee, 'username'>[];
  tags: TicketTag[];
  created_by: string;
  type: string;
}

export interface UpdateTicketBody {
  name: string;
  description: string;
  assignees: Exclude<Assignee, 'username'>[];
  tags: TicketTag[];
  status: string;
  created_by: string;
  type: string;
}
