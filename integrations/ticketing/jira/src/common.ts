/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-idk';
import axios from 'axios';
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

export async function getBaseUrl(config: Config, headers: Record<string, string>): Promise<string> {
  if (config.authType === 'OAuth2') {
    const response = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        Authorization: headers['Authorization'],
      },
    });

    const cloudId = response.data.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (resource: any) => resource.url === `https://${config.jira_domain}`,
    ).id;
    return `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/2`;
  }

  return `https://${config.jira_domain}/rest/api/2`;
}
