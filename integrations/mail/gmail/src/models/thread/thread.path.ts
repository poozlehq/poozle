/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertThread } from './thread.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/threads';

export class ThreadPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTag(url: string, headers: AxiosHeaders, _params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return convertThread(response.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/${params.pathParams?.thread_id}`;
    switch (method) {
      case 'GET':
        return this.getTag(url, headers, params);

      default:
        return {};
    }
  }
}
