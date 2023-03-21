/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

const PIPEDRIVE_URL = 'https://api.pipedrive.com/v1';

export async function fetchCurrentUser(
  qs: Record<string, string | number | boolean>,
) {
  return axios.get(`${PIPEDRIVE_URL}/users/me`, { params: qs });
}
