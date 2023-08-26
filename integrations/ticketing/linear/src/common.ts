/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const BASE_URL = 'https://api.linear.app/graphql';

export interface Meta {
  previous: string;
  next: string;
  current: string;
}

export function getMetaParams(data: any[], limit: number, page: number) {
  return {
    previous: (page > 1 ? page - 1 : '').toString(),
    current: page.toString(),
    next: data.length === limit ? (page + 1).toString() : '',
  };
}
