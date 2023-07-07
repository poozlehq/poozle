/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  auth_specification: {
    'Api Key': {
      input_specification: {
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
        Authorization: 'token ${api_key}',
        'User-Agent': 'Poozle',
      },
    },
    OAuth2: {
      token_url: 'https://github.com/login/oauth/access_token',
      authorization_url: 'https://github.com/login/oauth/authorize',
      input_specification: {
        type: 'object',
        properties: {
          client_id: {
            type: 'string',
            title: 'Client Id',
            description: 'Enter the Client Id',
          },
          client_secret: {
            type: 'string',
            title: 'Client secret',
            description: 'Enter the Client secret',
          },
          refresh_token: {
            type: 'string',
            title: 'Refresh token',
            description: 'Enter the Refresh token',
          },
          scope: {
            type: 'string',
            title: 'Scope',
            description: 'Enter the Scope',
          },
        },
      },
    },
  },
  other_inputs: {
    input_specification: {
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
};
