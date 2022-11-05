/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Client, getClient, ResponseType, Body } from '@tauri-apps/api/http';

export async function getHTTPApiClient(): Promise<Client> {
  const client = await getClient();
  return client;
}

export { ResponseType, Body };
