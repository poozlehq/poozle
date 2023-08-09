/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  'Api-Key': {
    input_specification: {
      type: 'object',
      properties: {
        email_id: {
          type: 'string',
          title: 'Email ID',
          description: 'Enter the Email ID',
        },
        api_key: {
          type: 'string',
          title: 'Api Key',
          description: 'Enter the API Key',
        },
      },
    },
  },
  auth_specification: {
    OAuth2: {
      token_url: 'https://${zendesk_domain}/oauth/authorizations/new',
      authorization_url: 'https://${zendesk_domain}/oauth/tokens',
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
        zendesk_domain: {
          type: 'string',
          title: 'Zendesk Domain',
          description: 'Enter the subdomain for Zendesk. example: poozlehelp.zendesk.com',
        },
      },
    },
  },
};
