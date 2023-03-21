import axios from 'axios';
/** Copyright (c) 2023, Poozle, all rights reserved. **/

const ZOOM_URL = 'https://zoom.us/oauth/token';

export async function getAccessToken(
  client_id: string,
  client_secret: string,
  account_id: string,
) {
  const idSecret = `${client_id}:${client_secret}`;

  const response = await axios.post(
    ZOOM_URL,
    {
      grant_type: 'account_credentials',
      account_id,
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(idSecret).toString('base64')}`,
      },
    },
  );

  return response.data['Access_token'];
}
