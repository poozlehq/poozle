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
      tokenUrl: 'https://github.com/login/oauth/access_token',
    },
  },
  supportedFilters: ['status', 'since', 'assignee_id'],
  supportedSortBy: ['created_at', 'updated_at'],
};
