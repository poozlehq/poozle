import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetTicketsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const response = await axios({
      url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues`,
      headers,
    });

    return {
      data: response.data.map((data: any) =>
        convertToModelKeys(
          {
            id: data.id,
            subject: data.title,
            collection_id: params.pathParams?.collection_id,
            description: data.body,
            status: data.state,
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_by: data.user.login,
            type: data.pull_request ? 'pull_request' : 'issue',
            assignees: data.assignees.map((ass: any) => ({
              id: ass.id,
              username: ass.login,
            })),
            ticket_url: data.url,
            tags: data.labels.map((lab: any) => ({
              id: lab.id,
              name: lab.name,
            })),
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
