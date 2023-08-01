/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';
import { PageParams } from './page.interface';

import { convertPage } from './pages.utils';

export class PagePath extends BasePath {
  async fetchSinglePage(url: string, headers: AxiosHeaders, _params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertPage(response.data),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: PageParams, config: Config) {
    const BASE_URL = await getBaseUrl(config, headers);
    const url = `${BASE_URL}/pages/${params.pathParams?.page_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSinglePage(url, headers, params);

      default:
        return {};
    }
  }
}
