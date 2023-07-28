/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-idk';
import dayjs from 'dayjs';

export interface Meta {
  previous: string;
  next: string;
  current: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMetaParams(data: any[], limit: number, page: number) {
  return {
    previous: (page > 1 ? page - 1 : '').toString(),
    current: page.toString(),
    next: data.length === limit ? (page + 1).toString() : '',
  };
}

export function convertTimestampToTZFormat(date: string) {
  return new Date(date).toISOString();
}

export function formatDateForSince(date: string) {
  return dayjs(new Date(date)).format('YYYY-MM-DD');
}

export function getBaseUrl(config: Config){
  return `https://${config.jira_domain}/rest/api/2`;
}