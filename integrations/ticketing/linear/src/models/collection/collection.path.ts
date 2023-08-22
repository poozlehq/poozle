/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CollectionResponse, GetCollectionParams } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionPath extends BasePath {
  async fetchSingleCollection(
    headers: AxiosHeaders,
    params: GetCollectionParams,
  ): Promise<CollectionResponse> {
    try {
      const id = params.pathParams?.collection_id;
      const response = await axios.post(
        BASE_URL,
        {
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
          variables: {
            id,
          },
        },
        { headers },
      );
      return {
        data: convertCollection(response.data),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    return this.fetchSingleCollection(headers, params as GetCollectionParams);
  }
}
