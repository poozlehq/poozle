/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['Api Key', 'OAuth2'],
  authSpecification: {
    'Api Key': {
      inputSpecification: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            title: 'Api Key',
            description: 'Enter the API Key',
          },
        },
      },
      headers: {
        Authorization: 'Bearer ${access_token}',
        'User-Agent': 'Poozle',
      },
    },
    OAuth2: {
      tokenUrl: 'https://oauth2.googleapis.com/token',
    },
  },
  supportedFilters: ['status', 'since', 'assignee_id', 'direction'],
  supportedSortBy: ['created_at', 'updated_at'],
};
