import { BasePath, Config, convertToModelKeys, convertToRequestBody, Params } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

const ticketMappings = {
  subject: 'title',
  description: 'body',
  assignees: 'assignees',
  tags: 'label',
  status: 'state',
};

export class PutTicketsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}`;
    const body = params.requestBody;
    const createBody = convertToRequestBody(body, ticketMappings);

    const response = await axios.post(url, createBody, { headers });

    return {
      data: convertToModelKeys(
        {
          id: response.data.id,
          subject: response.data.title,
          collection_id: params.pathParams?.collection_id,
          description: response.data.body,
          status: response.data.state,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
          created_by: response.data.user.login,
          type: response.data.pull_request ? 'pull_request' : 'issue',
          assignees: response.data.assignees.map((ass: any) => ({
            id: ass.id,
            username: ass.login,
          })),
          ticket_url: response.data.url,
          tags: response.data.labels.map((lab: any) => ({
            id: lab.id,
            name: lab.name,
          })),
        },
        this.schema,
        response.data,
        params.queryParams?.raw ? true : false,
      ),
      meta: {},
    };
  }
}
