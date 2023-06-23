import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetCollectionsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const response = await axios({
      url: `${BASE_URL}/orgs/${config.org}/repos`,
      headers,
      params: {
        per_page: params.queryParams?.limit,
        page,
      },
    });

    return {
      data: response.data.map((data: any) =>
        convertToModelKeys(
          {
            id: data.name,
            name: data.full_name,
            type: 'PROJECT',
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
          this.schema,
          data,
          params.queryParams?.raw ? true : false,
        ),
      ),
      meta: {
        items_on_page: params.queryParams?.limit,
        cursors: {
          before: page > 1 ? page - 1 : 1,
          current: page,
          next: page + 1,
        },
      },
    };
  }
}
