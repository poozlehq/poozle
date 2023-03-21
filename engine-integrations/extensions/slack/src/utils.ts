/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

export async function getConversations(
  headers: Record<string, string | number | boolean>,
) {
  return axios.get('https://slack.com/api/conversations.list', { headers });
}
