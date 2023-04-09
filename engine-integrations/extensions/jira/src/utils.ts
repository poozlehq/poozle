/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

export async function fetchCurrentUser(
  jira_url: string,
  headers: Record<string, string | number | boolean>,
) {
  return axios.post(`${jira_url}/auth/1/session`, { Headers: headers });
}
