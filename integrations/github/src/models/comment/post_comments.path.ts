import {
  BasePath,
  Config,
  convertToModelKeys,
  Params,
  convertToRequestBody,
} from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

const commentMappings = {
  description: 'body',
};

export class PostCommentsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}/comments`;
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, commentMappings);

    const response = await axios.post(url, createBody, { headers });
    return {
      data: convertToModelKeys(
        {
          id: response.data.id,
          ticket_id: response.data.issue_url.match(/\/(\d+)$/)?.[1],
          body: response.data.body,
          created_by_id: response.data.user.id,
          created_by: response.data.user.login,
          description: response.data.description,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        },
        this.schema,
        response.data,
        params.queryParams?.raw ? true : false,
      ),
      meta: {},
    };
  }
}
