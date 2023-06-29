/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Collection, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertCollection } from './collection.utils';

export class GetCollectionsPath extends BasePath<any> {
  async fetchCollections(url: string, headers: AxiosHeaders, params: Params) {
    console.log(url, headers, params);
    const response = await axios({
      url,
      headers,
    });

    return response.data.map((data: any) => convertCollection(data));
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Collection>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/project`;
    switch (method) {
      case 'GET':
        return this.fetchCollections(url, headers, params);

      default:
        return {};
    }
  }
}
