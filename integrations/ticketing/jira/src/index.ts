/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  GenericProxyModel,
  SpecificationResponse,
} from '@poozle/engine-edk';
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
  console.log(response);
  return response;
}

export default main;

main('RUN', {
  path: '/tickets',
  method: 'GET',
  params: {
    queryParams: { raw: true, cursor: 1, limit: 5, sort:'created_at', direction:"asc"},
    pathParams: { collection_id: '10028'},
    requestBody: {
      name: "new bug",
      description: 'this is updated from unified',
      color: '0f0ff0'
    }
  },
  config: {
    email_id: 'aditya@velocity.in',
    api_key: 'ATATT3xFfGF0mJlimJBUfThciqHUKpvKq-3-tVaIdIy_glb8IB1BpIXLo8upSSJTxOCEV7PPeWbDsIc13EnK-ChvD8GVnAhB8FXYcPhaeXWvW2NQ3at-VYQ3l6rOOXtwRssSVL0B6OE6ydYe3EtQgH7JTFgNPXBzENBz0OSnhL_rNO7TpEbtW6g=C27E8EF4',
    authType: 'Api Key',
    jira_domain: 'gelocity',
  },
})
