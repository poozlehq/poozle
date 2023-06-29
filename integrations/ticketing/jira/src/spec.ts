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
            description: 'Enter the Email ID'

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
      headers: {
        Authorization: 'Basic `${Buffer.from(`${email_id}:${api_key}`).toString(\'base64\')` '
      },
    }
  },
  supportedFilters: ['status', 'since', 'assignee_id'],
  supportedSortBy: ['created_at', 'updated_at'],
};
