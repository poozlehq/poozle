/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

const CLICKUP_URL = 'https://api.clickup.com/api/v2';

export async function fetchCurrentUser(
  headers: Record<string, string | number | boolean>,
) {
  return axios.get(`${CLICKUP_URL}/user`, { headers });
}
