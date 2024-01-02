/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  auth_specification: {
    'Api Key': {
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
    OAuth2: {
      authorization_url: 'https://auth.atlassian.com/authorize',
      token_url: 'https://auth.atlassian.com/oauth/token',
      default_scopes: ['offline_access'],
      authorization_params: {
        audience: 'api.atlassian.com',
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
  other_inputs: {
    input_specification: {
      type: 'object',
      properties: {
        jira_domain: {
          type: 'string',
          title: 'Jira Domain',
          description: 'Enter the subdomain for Jira. example: abc.atlassian.net',
        },
        custom_fields: {
          type: 'object',
          title: 'custom_fields',
          description: 'Enter the custom fields',
        },
      },
    },
  },
};
