/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BaseIntegration,
  CheckResponse,
  Config,
  getAccessToken,
  interpolateString,
  SpecificationResponse,
} from '@poozle/engine-idk';
import axios from 'axios';
import { ProxyPath } from 'proxy';

import { AccountPath } from 'models/accounts/account.path';
import { AccountsPath } from 'models/accounts/accounts.path';
import { CommentsPath } from 'models/comment/comments.path';
import { TagsPath } from 'models/tag/tags.path';
import { TeamPath } from 'models/team/team.path';
import { TeamsPath } from 'models/team/teams.path';
import { TicketPath } from 'models/ticket/ticket.path';
import { TicketsPath } from 'models/ticket/tickets.path';
import { UserPath } from 'models/user/user.path';
import { UsersPath } from 'models/user/users.path';

import spec from './spec';
import { getBaseUrl } from 'common';

class ZendeskIntegration extends BaseIntegration {
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
      const baseURL = getBaseUrl(config);

      await axios({
        url: `${baseURL}/users/me`,
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

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new AccountsPath(/^\/?accounts$/g, ['GET', 'POST']),
      new AccountPath(/^\/?accounts+/g, ['GET', 'PUT']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new CommentsPath(/^\/?comments$/g, ['GET', 'POST']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TagsPath(/^\/?tags$/g, ['GET', 'POST']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TeamsPath(/^\/?teams$/g, ['GET', 'POST']),
      new TeamPath(/^\/?teams+/g, ['GET', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TicketsPath(/^\/?tickets$/g, ['GET', 'POST']),
      new TicketPath(/^\/?tickets+/g, ['GET', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new UsersPath(/^\/?users$/g, 'GET'),
      new UserPath(/^\/?users+/g, 'GET'),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new ZendeskIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
