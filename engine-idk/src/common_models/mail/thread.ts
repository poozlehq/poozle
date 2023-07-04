/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Message } from './message';

export const ThreadSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
    },
    history_id: {
      type: 'string',
      default: '',
    },
    messages: {
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
          required: [],
        },
      ],
    },
  },
};

export interface Thread {
  id: string;
  history_id: string;
  messages: Message[];
}
