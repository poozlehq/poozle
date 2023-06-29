/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Collection, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertComments } from './comments.utils';

export class GetCommentPath extends BasePath<any> {
  async fetchSingleComment(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return convertComments(response.data, params.pathParams?.ticket_id as string | null);
  }

  async updateComment(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios.put(url, params.requestBody, { headers });

    return convertComments(response.data, params.pathParams?.ticket_id as string | null);
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Collection>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/issue/${params.pathParams?.ticket_id}/comment/${params.pathParams?.comment_id}`;
    switch (method) {
      case 'GET':
        return this.fetchSingleComment(url, headers, params);

      case 'PATCH':
        return this.updateComment(url, headers, params)

      default:
        return {};
    }
  }
}
