import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetCommentsPath extends BasePath {
  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios({
      url,
      headers,
    });

    let responseData: any[] = [];

    if (Array.isArray(response.data)) {
      responseData = response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      responseData = [response.data];
    }
    
    return {
      data: responseData.map((data: any) =>
        convertToModelKeys(
          {
            id: data.id,
            ticket_id: data.issue_url.match(/\/(\d+)$/)?.[1],
            body: data.body,
            created_by_id: data.user.id,
            created_by: data.user.login,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
          this.schema,
          data,
          params.queryParams?.raw ? true : false,
        ),
      ),
      meta: {},
    };
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    if (params.pathParams?.comment_id) {
      const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments/${params.pathParams?.comment_id}`;
      return this.fetchData(url, headers, params);
    } else if (params.pathParams?.ticket_id) {
      const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
      return this.fetchData(url, headers, params);
    } else {
      const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/comments`;
      return this.fetchData(url, headers, params);
    }
  }
}
