/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { BASE_URL, convertBlockPage } from './pages.utils';

export class PagePath extends BasePath {
  async fetchSinglePage(url: string, headers: AxiosHeaders, _params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return convertBlockPage(response.data);
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/blocks/${params.pathParams?.page_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSinglePage(url, headers, params);

      default:
        return {};
    }
  }
}
