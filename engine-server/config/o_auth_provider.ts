/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
  Gmail: {
    auth_mode: 'OAUTH2',
    authorization_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_url: 'https://oauth2.googleapis.com/token',
    authorization_params: {
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    },
  },
  Github: {
    auth_mode: 'OAUTH2',
    authorization_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_url: 'https://oauth2.googleapis.com/token',
    authorization_params: {
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    },
  },
  Youtube: {
    auth_mode: 'OAUTH2',
    authorization_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_url: 'https://oauth2.googleapis.com/token',
    authorization_params: {
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    },
  },
  Slack: {
    auth_mode: 'OAUTH2',
    authorization_url: 'https://slack.com/oauth/v2/authorize',
    token_url: 'https://slack.com/api/oauth.v2.access',
  },
};
