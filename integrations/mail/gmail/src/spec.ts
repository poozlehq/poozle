/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  authSupported: ['OAuth2'],
  authSpecification: {
    OAuth2: {
      tokenUrl: 'https://oauth2.googleapis.com/token',
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
  ],
  supportedSortBy: ['created_at'],
};
