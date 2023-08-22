/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { IssueLabelCreateParams, TagCreateResponse, TagsResponse } from './tag.interface';
import { convertTag } from './tag.utils';

export class TagsPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTags(headers: AxiosHeaders, params: Params): Promise<TagsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(<string>params.queryParams?.cursor) : 1;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            query getIssueLabels {
              issueLabels {
                nodes {
                  id
                  createdAt
                  description
                  name
                }
              }
            }
          `,
        },
        { headers },
      );
      const issueLabelList: object[] = response.data.data.issueLabels.nodes;
      return {
        data: issueLabelList.map(convertTag),
        meta: getMetaParams(response.data, <number>params.queryParams?.cursor, page),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async createTag(
    headers: AxiosHeaders,
    params: IssueLabelCreateParams,
  ): Promise<TagCreateResponse> {
    try {
      const input = params;
      const response = await axios.post(
        BASE_URL,
        {
          query: `
            mutation IssueLabelCreate($input: IssueLabelCreateInput!) {
              issueLabelCreate(input: $input) {
                lastSyncId
                issueLabel {
                  id
                  createdAt
                  description
                  name
                }
                success
              }
            }
          `,
          variables: {
            input,
          },
        },
        { headers },
      );
      return {
        success: response.data.success,
        lastSyncId: response.data.lastSyncId,
        tag: convertTag(response.data.issueLabel),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.getTags(headers, params);

      case 'POST':
        return this.createTag(headers, params as IssueLabelCreateParams);

      default:
        throw new Error('Method not found');
    }
  }
}
