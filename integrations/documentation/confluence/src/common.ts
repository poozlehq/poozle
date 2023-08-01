/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-idk';
import axios from 'axios';

export const BASE_URL = 'https://api.github.com';

export interface Meta {
  previous: string;
  next: string;
  current: string;
}

export function getMetaParams(data: any, currentCursor: string) {
  const cursorPattern = /(?<=cursor=)[^&]+/;
  const match = data._links?.next ? data._links.next.match(cursorPattern) : '';

  return {
    previous: '',
    current: currentCursor,
    next: match ? match[0] : '',
  };
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
    return `https://api.atlassian.com/ex/confluence/${cloudId}/wiki/api/v2`;
  }

  return `https://${config.confluence_domain}/wiki/api/v2`;
}
