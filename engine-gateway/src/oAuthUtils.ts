/** Copyright (c) 2023, Poozle, all rights reserved. **/

import axios from 'axios';

/**
 * A helper function to interpolate a string.
 * interpolateString('Hello ${name} of ${age} years", {name: 'Tester', age: 234}) -> returns 'Hello Tester of age 234 years'
 *
 * @remarks
 * Copied from https://stackoverflow.com/a/1408373/250880
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function interpolateString(str: string, replacers: Record<string, any>) {
  return str.replace(/\${([^{}]*)}/g, (a, b) => {
    const r = replacers[b];
    return typeof r === 'string' || typeof r === 'number' ? (r as string) : a; // Typecast needed to make TypeScript happy
  });
}

export async function getAccessToken(
  url: string,
  data: Record<string, string>,
) {
  const response = await axios({
    method: 'POST',
    url,
    data: { ...data, grant_type: 'refresh_token' },
  });

  return response.data.access_token;
}

export async function interpolateHeaders(
  headersDefault: Record<string, string>,
  replacers: Record<string, string>,
) {
  const headers: Record<string, string> = {};

  Object.keys(headersDefault).forEach((key) => {
    headers[key] = interpolateString(headersDefault[key], replacers);
  });

  return headers;
}
