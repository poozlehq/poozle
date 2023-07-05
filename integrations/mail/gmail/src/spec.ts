/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['OAuth2'],
  authSpecification: {
    OAuth2: {
      authorization_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_url: 'https://oauth2.googleapis.com/token',
      authorization_params: {
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  },
  supportedFilters: [
    'subject',
    'from',
    'to',
    'cc',
    'bcc',
    'labels',
    'starred',
    'unread',
    'direction',
    'received_after',
    'received_before',
  ],
  supportedSortBy: ['received_at'],
};
