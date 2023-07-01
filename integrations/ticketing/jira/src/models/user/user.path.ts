/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertUser } from './user.utils';

export class UserPath extends BasePath {
  async fetchSingleUser(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertUser(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, config: Config) {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/user?accountId=${params.pathParams?.user_id}`;
        return this.fetchSingleUser(url, headers, params);

      default:
        return {};
    }
  }
}
