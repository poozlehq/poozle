import {
  BaseIntegration,
  CheckResponse,
  Config,
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
import axios from 'axios';

class GithubIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      await axios({
        url: `https://api.github.com/user`,
        headers: {
          Authorization: `Bearer ${config.api_key}`,
        },
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

export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
