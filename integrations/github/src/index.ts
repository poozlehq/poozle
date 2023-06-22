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

  return response;
}

export default main;
