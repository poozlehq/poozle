/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  auth_specification: {
    Token: {
      input_specification: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            title: 'Token',
            description: 'Enter the Token',
          },
        },
      },
      headers: {
        Authorization: 'Bearer ${token}',
      },
    },
    OAuth2: {
      authorization_url: 'https://slack.com/oauth/v2/authorize',
      token_url: 'https://slack.com/api/oauth.v2.access',
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
