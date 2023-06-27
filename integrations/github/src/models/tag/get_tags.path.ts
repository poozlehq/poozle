/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetTagsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const response = await axios({
      url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/labels`,
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
}
