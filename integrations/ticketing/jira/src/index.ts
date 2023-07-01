/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';

import { JiraAttachmentModel } from 'models/attachment/attachment.model';
import { JiraCollectionModel } from 'models/collection/collection.model';
import { JiraCommentModel } from 'models/comment/comments.model';
import { JiraTicketModel } from 'models/ticket/ticket.model';
import { JiraUserModel } from 'models/user/user.model';

import spec from './spec';

class JiraIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async authHeaders(config: Config) {
    return {
      Authorization: `Basic ${Buffer.from(`${config.email_id}:${config.api_key}`).toString(
        'base64',
      )}`,
    };
  }

  async check(config: Config): CheckResponse {
    try {
      await axios({
        url: `https://${config.jira_domain}.atlassian.net/rest/api/2/issue/createmeta`,
        headers: {
          Authorization: `Basic ${Buffer.from(`${config.email_id}:${config.api_key}`).toString(
            'base64',
          )}`,
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
      new JiraTicketModel(),
      new JiraCollectionModel(),
      new JiraCommentModel(),
      new JiraUserModel(),
      new JiraAttachmentModel(),
    ];
  }
}

export async function main(command: string, allParams: any) {
  const integration = new JiraIntegration();

  const response = await integration.runCommand(command, allParams);
  return response;
}

export default main;
