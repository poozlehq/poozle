/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
  getAccessToken,
  interpolateString,
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
    try {
      if (config.authType === 'OAuth2') {
        const spec = await this.spec();
        const specification = spec.auth_specification['OAuth2'];
        const token = await getAccessToken(
          interpolateString(specification.token_url as string, config),
          config,
        );
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return headers;
      }

      return {
        Authorization: `Basic ${Buffer.from(`${config.email_id}:${config.api_key}`).toString(
          'base64',
        )}`,
      };
    } catch (err) {
      return {};
    }
  }

  async check(config: Config): CheckResponse {
    const headers = await this.authHeaders(config);

    try {
      const response = await axios({
        url: `https://${config.jira_domain}.atlassian.net/rest/api/2/project`,
        headers,
      });

      if ('x-seraph-loginreason' in response.headers) {
        return {
          status: false,
          error: 'AUTHENTICATED_FAILED',
        };
      }

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new JiraIntegration();

  const response = await integration.runCommand(command, allParams);
  return response;
}

export default main;
