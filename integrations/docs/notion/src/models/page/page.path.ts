/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { BASE_URL, convertPage } from './pages.utils';

export class GetPagePath extends BasePath {
  async fetchSinglePage(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });
      return convertPage(response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    const url = `${BASE_URL}/pages/${params.pathParams?.page_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSinglePage(url, headers, params);

      default:
        return {};
    }
  }
}
