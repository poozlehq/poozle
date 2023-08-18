/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const BASE_URL = 'https://api.stripe.com/v1';

export interface Meta {
  previous: string;
  next: string;
  current: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMetaParams(data: any, page: string) {
  return {
    previous: '',
    current: page,
    next: data.has_more ? data.data[data.data.length - 1].id : '',
  };
}

export function convertToDateTime(epochTime: string) {
  const date = new Date(Number(epochTime) * 1000);
  return epochTime ? date.toISOString() : '';
}

export function convertToEpoch(datetime: string) {
  const date = new Date(datetime);
  return date.getTime() / 1000;
}

export class RateLimitError extends Error {
  tryAfter: string;
  constructor(tryAfter = '120') {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
    this.tryAfter = tryAfter;
  }
}
