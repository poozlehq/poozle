/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-idk';

export const BASE_URL = 'GIVE_BASE_URL';

export interface Meta {
  previous: string;
  next: string;
  current: string;
}

export function getMetaParams(data: any, current_page: string): Meta {
  return {
    previous: '',
    current: current_page,
    next: data.end_time.toString() ?? '',
  };
}

export function convertEpoc(epochTime: string) {
  const date = new Date(Number(epochTime));
  return date.toISOString();
}

export function convertDatetime(datetime: string) {
  const date = new Date(datetime);
  return date.getTime() / 1000;
}

export function getBaseUrl(config: Config): string {
  return `https://${config.zendesk_domain}/api/v2`;
}

function getPage(pageUrl: string, param: string) {
  const url = new URL(pageUrl);
  const params = new URLSearchParams(url.search);
  return params.get(param) ?? '';
}

export function getPageMeta(data: any, current_page: string): Meta {
  return {
    previous: data.previous_page ? getPage(data.previous_page, 'page') : '',
    current: current_page,
    next: data.previous_page ? getPage(data.next_page, 'page') : '',
  };
}

export function getCommentMeta(data: any, current_page: string): Meta {
  return {
    previous: data.previous_page ? getPage(data.previous_page, 'page') : '',
    current: current_page,
    next: data.previous_page ? getPage(data.next_page, 'page') : '',
  };
}
