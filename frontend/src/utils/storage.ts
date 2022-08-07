import { Store } from 'tauri-plugin-store-api';
const store = new Store('.settings.dat');

export type Data = { [key: string]: any } | string;

export async function setData(key: string, data: Data) {
  await store.set(key, data);
}

export async function getData(key: string): Promise<any> {
  return await store.get(key);
}
