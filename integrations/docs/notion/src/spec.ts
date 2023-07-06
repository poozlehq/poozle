/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['Api Key'],
  authSpecification: {
    'Api Key': {
      inputSpecification: {
        type: 'object',
        properties: {
          api_key: {
            type: 'string',
            title: 'Api Key',
            description: 'Enter the API Key',
          },
        },
      },
      headers: {
        Authorization: 'Bearer ${api_key}',
        'Notion-Version': '2022-06-28',
      },
    },
  },
  supportedFilters: [
    'subject',
    'from',
    'to',
    'cc',
    'bcc',
    'labels',
    'starred',
    'unread',
    'direction',
    'received_after',
    'received_before',
  ],
  supportedSortBy: ['received_at'],
};
