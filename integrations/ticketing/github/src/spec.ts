/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['Api Key', 'OAuth2'],
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
          org: {
            type: 'string',
            title: 'Organisation',
            description: 'Enter the organisation identifier',
          },
        },
      },
      headers: {
        Authorization: 'token ${api_key}',
        'User-Agent': 'Poozle',
      },
    },
    OAuth2: {
      token_url: 'https://github.com/login/oauth/access_token',
      authorization_url: 'https://github.com/login/oauth/authorize',
      inputSpecification: {
        type: 'object',
        properties: {
          org: {
            type: 'string',
            title: 'Organisation',
            description: 'Enter the organisation identifier',
          },
        },
      },
    },
  },
  supportedFilters: ['status', 'since', 'assignee_id', 'direction'],
  supportedSortBy: ['created_at', 'updated_at'],
};
