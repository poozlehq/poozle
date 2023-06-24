/** Copyright (c) 2023, Poozle, all rights reserved. **/

export default {
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
};
