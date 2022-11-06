/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Store } from 'tauri-plugin-store-api';
const store = new Store('.settings.dat');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any> | string;

export async function setData(key: string, data: Data) {
  await store.set(key, data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getData(key: string): Promise<any> {
  return await store.get(key);
}
