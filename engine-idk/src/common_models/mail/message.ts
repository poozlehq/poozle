/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const MessageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    date: {
      type: 'string',
      default: '',
    },
    body: {
      type: 'string',
      default: '',
    },
    html_body: {
      type: 'string',
      default: '',
    },
    user_id: {
      type: 'string',
      default: '',
    },
    snippet: {
      type: 'string',
      default: '',
    },
    subject: {
      type: 'string',
      default: '',
    },
    thread_id: {
      type: 'string',
      default: '',
    },
    starred: {
      type: 'boolean',
      default: false,
    },
    unread: {
      type: 'boolean',
      default: '',
    },
    bcc: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              default: '',
            },
            name: {
              type: 'string',
              default: '',
            },
          },
          required: ['email', 'name'],
        },
      ],
    },
    cc: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              default: '',
            },
            name: {
              type: 'string',
              default: '',
            },
          },
          required: ['email', 'name'],
        },
      ],
    },
    from: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              default: '',
            },
            name: {
              type: 'string',
              default: '',
            },
          },
          required: ['email', 'name'],
        },
      ],
    },
    reply_to: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              default: '',
            },
            name: {
              type: 'string',
              default: '',
            },
          },
          required: ['email', 'name'],
        },
      ],
    },
    labels: {
      type: 'array',
      default: [],
      items: [
        {
          type: 'string',
          default: '',
        },
      ],
    },
  },
};

export interface Recipient {
  email: string;
  name: string;
}

export interface Message {
  id: string;
  body: string;
  html_body: string;
  user_id: string;
  date: string;
  snippet: string;
  subject: string;
  thread_id: string;
  starred: boolean;
  unread: boolean;
  cc: Recipient[];
  bcc: Recipient[];
  from: Recipient[];
  reply_to: Recipient[];
  labels: string[];
  in_reply_to: string;
}

export interface CreateMessage {
  body: string;
  html_body: string;
  subject: string;
  thread_id: string;
  cc: Recipient[];
  bcc: Recipient[];
  from: Recipient[];
  to: Recipient[];
  reply_to: Recipient[];
  in_reply_to: string;
}
