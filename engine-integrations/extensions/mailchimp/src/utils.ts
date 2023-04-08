/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

export async function pingMailchimp(
  data_center: string,
  headers: Record<string, string | number | boolean>,
) {
  return axios.get(`${data_center}.api.mailchimp.com/3.0/ping`, {
    headers,
  });
}
