import { Client, getClient, ResponseType } from '@tauri-apps/api/http';

export async function getHTTPApiClient(): Promise<Client> {
  const client = await getClient();
  return client;
}

export { ResponseType };
