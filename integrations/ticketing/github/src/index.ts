/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';

import { GithubCollectionModel } from 'models/collection/collection.model';
import { GithubCommentModel } from 'models/comment/comment.model';
import { GithubTagModel } from 'models/tag/tag.model';
import { GithubTeamModel } from 'models/team/team.model';
import { GithubTicketModel } from 'models/ticket/ticket.model';
import { GithubUserModel } from 'models/user/user.model';

import spec from './spec';

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      const headers = await this.authHeaders(config);

      await axios({
        url: 'https://api.github.com/user',
        headers,
      });

      return {
        status: true,
        error: '',
      };
    } catch (e) {
      return {
        status: false,
        error: e.message,
      };
    }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  console.log(response);
  return response;
}

export default main;

main('RUN', {
  path: '/collections',
  method: 'GET',
  params: {
    queryParams: {
      limit: 10,
    },
  },
  config: {
    api_key: '',
    workspace_id: '',
    authType: 'API Key',
  },
});
