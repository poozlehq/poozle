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
        Authorization: 'Bearer ${api_key}',
        'Notion-Version': '2022-06-28',
      },
    },
    OAuth2: {
      authorization_url: 'https://api.notion.com/v1/oauth/authorize',
      token_url: 'https://api.notion.com/v1/oauth/token',
      authorization_params: {
        response_type: 'code',
        owner: 'user'
      },
      authorization_method: 'header',
      body_format: 'json',
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
      headers: {
        'Notion-Version': '2022-06-28',
      }
    },
  },
};
