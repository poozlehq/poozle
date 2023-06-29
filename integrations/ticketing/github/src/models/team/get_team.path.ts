/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetTeamsPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: response.data.map((data: any) =>
        convertToModelKeys(
          {
            id: data.id,
            name: data.name,
            description: data.description,
          },
          this.schema,
          data,
          params.queryParams?.raw ? true : false,
        ),
      ),
      meta: {},
    };
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config) {
    if (params.pathParams?.teamName) {
      const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/teams/${params.pathParams?.teamName}`;
      return this.fetchData(url, headers, params);
    }
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/teams`;
    return this.fetchData(url, headers, params);
  }
}
