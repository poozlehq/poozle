/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  SpecificationResponse,
  getAccessToken,
  interpolateString,
} from '@poozle/engine-idk';
import axios from 'axios';
import { getBaseUrl } from 'common';
import { ProxyPath } from 'proxy';

import { CollectionPath } from 'models/collection/collection.path';
import { CollectionsPath } from 'models/collection/collections.path';
import { CommentPath } from 'models/comment/comment.path';
import { CommentsPath } from 'models/comment/comments.path';
import { TicketPath } from 'models/ticket/ticket.path';
import { TicketsPath } from 'models/ticket/tickets.path';
import { UserPath } from 'models/user/user.path';
import { UsersPath } from 'models/user/users.path';

import spec from './spec';
import { TicketTypesPath } from 'models/ticket_types/ticket_types.path';

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
          Authorization: `Bearer ${token.access_token}`,
          'refresh-token': token.refresh_token,
          expiry: token.expires_in,
        };

        return headers;
      }

      return {
        Authorization: `Basic ${Buffer.from(`${config.email_id}:${config.api_key}`).toString(
          'base64',
        )}`,
      };
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  async check(config: Config): CheckResponse {
    const headers = (await this.authHeaders(config)) as Record<string, string>;

    try {
      const baseURL = await getBaseUrl(config, headers);

      const response = await axios({
        url: `${baseURL}/project`,
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

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * This paths get the projects from github
       */
      new CollectionsPath(/^\/?collections$/g, 'GET'),
      new CollectionPath(/^\/?collections+/g, 'GET'),

      /**
       * These map to tickets
      */
      new TicketTypesPath(/^\/?tickets\/types$/g, 'GET'),
      new TicketsPath(/^\/?tickets$/g, ['GET', 'POST']),
      new TicketPath(/^\/?tickets+/g, ['GET', 'PATCH']),

      new CommentsPath(/^\/?comments$/g, ['GET', 'POST']),
      new CommentPath(/^\/?comments+/g, ['GET', 'PATCH']),

      new UsersPath(/^\/?users$/g, 'GET'),
      new UserPath(/^\/?users+/g, 'GET'),
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
