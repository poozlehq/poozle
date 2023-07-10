/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  auth_specification: {
    OAuth2: {
      authorization_url: 'https://login.xero.com/identity/connect/authorize',
      token_url: 'https://identity.xero.com/connect/token',
      authorization_params: {
        response_type: 'code'
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
