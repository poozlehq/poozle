/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

const GOOGLE_ENDPOINT = 'https://oauth2.googleapis.com/token';

interface TokenResponse {
  access_token: string;
}

interface GoogleTokens {
  refresh_token: string;
  access_token: string;
}

export async function fetchAccessToken(
  client_id: string,
  client_secret: string,
  refresh_token: string,
): Promise<TokenResponse> {
  const response = await axios.post(
    GOOGLE_ENDPOINT,
    {
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return response.data;
}

export async function getGoogleToken(
  code: string,
  client_id: string,
  client_secret: string,
  redirect_uri: string,
): Promise<GoogleTokens> {

  console.log('here')
  console.log(code, client_id, client_secret, redirect_uri)
  const response = await axios.post(
    GOOGLE_ENDPOINT,
    {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  console.log(response.status);
  console.log(response.data.toString())

  return response.data;
}
