/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, CheckResponse, Config, SpecificationResponse } from '@poozle/engine-idk';
import axios from 'axios';
import { ProxyPath } from 'proxy';

import { CollectionPath } from 'models/collection/collection.path';
import { CollectionsPath } from 'models/collection/collections.path';
import { CommentPath } from 'models/comment/comment.path';
import { CommentsPath } from 'models/comment/comments.path';
import { TagPath } from 'models/tag/tag.path';
import { TagsPath } from 'models/tag/tags.path';
import { TeamPath } from 'models/team/team.path';
import { TeamsPath } from 'models/team/teams.path';
import { TicketPath } from 'models/ticket/ticket.path';
import { TicketsPath } from 'models/ticket/tickets.path';
import { UserPath } from 'models/user/user.path';
import { UsersPath } from 'models/user/users.path';

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

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * This paths get the repos from github
       */
      new CollectionsPath(/^\/?collections$/g, 'GET'),
      new CollectionPath(/^\/?collections+/g, 'GET'),

      /**
       * These map to issues comments
       */
      new CommentsPath(/^\/?comments$/g, ['GET', 'POST']),
      new CommentPath(/^\/?comments+/g, ['GET', 'PATCH']),

      /**
       * These map to tags
       */
      new TagsPath(/^\/?tags$/g, ['GET', 'POST']),
      new TagPath(/^\/?tags+/g, ['GET', 'PATCH']),

      /**
       * Mapped to teams
       */
      new TeamsPath(/^\/?teams$/g, ['GET', 'POST']),
      new TeamPath(/^\/?teams+/g, ['GET', 'PATCH']),

      /**
       * Mapped to issues
       */
      new TicketsPath(/^\/?tickets$/g, ['GET', 'POST']),
      new TicketPath(/^\/?tickets+/g, ['GET', 'PATCH']),

      /**
       * Mapped to users
       */
      new UsersPath(/^\/?users$/g, 'GET'),
      new UserPath(/^\/?users+/g, 'GET'),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new GithubIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;
