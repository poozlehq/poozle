/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/engines';

interface TokenResponse {
  access_token: string;
}

export async function fetchEngines(
    headers: Record<string, string | number | boolean>,
): Promise<TokenResponse> {
  const response = await axios.get(
    OPENAI_ENDPOINT,
    {
      headers: headers,
    },
  );

  return response.data;
}
