/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['Api Key', 'OAuth2'],
  authSpecification: {
    'Api Key': {
      inputSpecification: {
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
          jira_domain: {
            type: 'string',
            title: 'Jira Domain',
            description: 'Enter the subdomain for Jira',
          },
        },
      },
    },
    OAuth2: {
      authorization_url: 'https://auth.atlassian.com/authorize',
      token_url: 'https://auth.atlassian.com/oauth/token',
      authorization_params: {
        audience: 'api.atlassian.com',
        prompt: 'consent',
      },
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
  supportedFilters: ['direction'],
  supportedSortBy: ['created_at', 'updated_at'],
};
