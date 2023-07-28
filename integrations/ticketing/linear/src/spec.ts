/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  auth_specification: {
    OAuth2: {
      token_url: 'https://api.linear.app/oauth/token',
      authorization_url: 'https://linear.app/oauth/authorize',
      authorization_params: {
        response_type: 'code',
        prompt: 'consent',
      },
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
};