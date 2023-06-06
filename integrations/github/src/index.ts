import {
  BaseIntegration,
  CheckResponse,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-edk';
import spec from './spec';

import { GithubTicketModel } from 'models/ticket/ticket.model';
import { GithubCollectionModel } from 'models/collection/collection.model';

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(_config: any): CheckResponse {
    return { status: false, error: '' };
  }

  models() {
    return [new GenericProxyModel(), new GithubTicketModel(), new GithubCollectionModel()];
  }
}

export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  console.log(response);
  return response;
}

// main('SPEC', {});
main('RUN', {
  path: '/collections',
  method: 'GET',
  params: {
    queryParams: { raw: true },
    pathParams: { collection_id: 'engine' },
  },
  config: {
    api_key: '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',
    authType: 'Api Key',
    org: 'poozlehq',
  },
});
