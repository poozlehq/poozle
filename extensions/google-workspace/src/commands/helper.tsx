/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { open } from '@tauri-apps/api/shell';

export async function createDocFromUrl(prefix: string) {
  const baseUrl = `https://docs.google.com/${prefix}/create`;
  await open(baseUrl);
  return baseUrl;
}
