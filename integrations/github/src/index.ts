import {
  BaseIntegration,
  CheckResponse,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-edk';
import spec from './spec';

import { GithubTicketModel } from 'models/ticket/ticket.model';
import { GithubCollectionModel } from 'models/collection/collection.model';
import { GithubCommentModel } from 'models/comment/comment.model';
import { GithubTagModel } from 'models/tag/tag.model';
import { GithubTeamModel } from 'models/team/team.model';
import { GithubUserModel } from 'models/user/user.model';

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(_config: any): CheckResponse {
    return { status: false, error: '' };
  }

  models() {
    return [
      new GenericProxyModel(),
      new GithubTicketModel(),
      new GithubCollectionModel(),
      new GithubCommentModel(),
      new GithubTagModel(),
      new GithubTeamModel(),
      new GithubUserModel(),
    ];
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
  path: '/tickets',
  method: 'PUT',
  params: {
    queryParams: { raw: true },
    pathParams: { collection_id: 'DBT-Denorm', ticket_id: '20'},
    requestBody: {
      subject: 'testing the extension 20',
      description: 'updating from integration ticket 20',
      assignees: ['saimanoj'],
      status: 'closed'}
  },
  config: {
    api_key: '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',
    authType: 'Api Key',
    org: 'poozlehq',
  },
});
