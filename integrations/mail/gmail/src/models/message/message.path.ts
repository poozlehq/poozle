/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { convertMessage } from './message.utils';

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';

export class GetMessagePath extends BasePath {
  async fetchSingleMessage(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertMessage(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/${params.pathParams?.message_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleMessage(url, headers, params);

      default:
        return {};
    }
  }
}
