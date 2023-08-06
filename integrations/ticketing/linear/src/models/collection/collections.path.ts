/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';

import { CollectionsResponse } from './collection.interface';
import {BASE_URL, getMetaParams} from "../../common";
import {convertCollection} from "./collection.utils";

export class CollectionsPath extends BasePath {
  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    _config: Config,
  ): Promise<CollectionsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(<string>params.queryParams?.cursor) : 1;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query Projects {
              projects {
                nodes {
                  id
                  createdAt
                  updatedAt
                  archivedAt
                  name
                  description
                  slugId
                  icon
                  color
                  state
                  projectUpdateRemindersPausedUntilAt
                  startDate
                  targetDate
                  startedAt
                  completedAt
                  canceledAt
                  autoArchivedAt
                  trashed
                  sortOrder
                  issueCountHistory
                  completedIssueCountHistory
                  scopeHistory
                  completedScopeHistory
                  inProgressScopeHistory
                  slackNewIssue
                  slackIssueComments
                  slackIssueStatuses
                  url
                  progress
                  scope
                }
              }
            }
          `,
        },
      });
      return {
        meta: getMetaParams(response.data, <number>params.queryParams?.cursor, page),
        data: response.data.nodes.map(convertCollection),
        raw: response.data.nodes,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
