import { BaseIntegration } from 'bases/base_integration';
import spec from './spec';
import { SpecificationResponse, CheckResponse, Params, Config } from 'types/integration';

import { BaseModel } from 'bases/base_model';
import { BasePath } from 'bases/base_path';
import { GenericProxyModel } from 'utils/proxy_path';
import axios, { AxiosHeaders } from 'axios';
import { convertToModelKeys } from 'utils/data_fixer';
import { CollectionSchema } from 'common_models/ticketing/collection';
import { TicketSchema } from 'common_models/ticketing/ticket';

const BASE_URL = 'https://api.github.com';

class GetTicketsPath extends BasePath {
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

class GetCollectionsPath extends BasePath {
  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    const response = await axios({
      url: `${BASE_URL}/orgs/${config.org}/repos`,
      headers,
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
      meta: {},
    };
  }
}

class GithubTicketModel extends BaseModel {
  constructor() {
    super('GithubTicketModel', TicketSchema);
  }

  paths() {
    return [new GetTicketsPath(/^\/?tickets$/g, 'GET', this.schema)];
  }
}

class GithubCollectionModel extends BaseModel {
  constructor() {
    super('GithubCollectionModel', CollectionSchema);
  }

  paths() {
    return [new GetCollectionsPath(/^\/?collections$/g, 'GET', this.schema)];
  }
}

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(_config: any): CheckResponse {
    return { status: false, error: '' };
  }

  models() {
    return [new GithubTicketModel(), new GenericProxyModel(), new GithubCollectionModel()];
  }
}

export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

// main('SPEC', {});
main('RUN', {
  path: '/tickets',
  method: 'GET',
  params: {
    queryParams: { raw: true },
    pathParams: { collection_id: 'engine' },
  },
});
