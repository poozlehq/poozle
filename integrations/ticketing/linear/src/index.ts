/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, CheckResponse, Config, SpecificationResponse } from '@poozle/engine-idk';
import axios from 'axios';
import { BASE_URL } from 'common';
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

class LinearIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  async check(config: Config): CheckResponse {
    try {
      const headers = await this.authHeaders(config);

      await axios({
        url: BASE_URL,
        headers,
        method: 'POST',
        data: {
          query: `
            query Me {
                  viewer {
                      id
                      name
                      email
                  }
            }
          `,
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

  paths() {
    return [
      /**
       * PROXY API calls to the third party directly
       */
      new ProxyPath(/^\/?proxy$/g, ['GET', 'POST', 'PATCH', 'DELETE']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new CollectionsPath(/^\/?collections$/g, 'GET'),
      new CollectionPath(/^\/?collection+/g, 'GET'),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new CommentsPath(/^\/?comments$/g, ['GET', 'POST']),
      new CommentPath(/^\/?comment+/g, ['GET', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TagsPath(/^\/?tags$/g, ['GET', 'POST']),
      new TagPath(/^\/?tag+/g, ['GET', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TeamsPath(/^\/?teams$/g, ['GET']),
      new TeamPath(/^\/?team+/g, ['GET', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new TicketsPath(/^\/?tickets$/g, ['GET']),
      new TicketPath(/^\/?ticket+/g, ['GET', 'POST', 'PATCH']),

      /**
       * TODO: Link to the documentation of the APIS this is mapping to
       */
      new UsersPath(/^\/?users$/g, 'GET'),
      new UserPath(/^\/?user+/g, 'GET'),
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new LinearIntegration();

  return await integration.runCommand(command, allParams);
}

export default main;
