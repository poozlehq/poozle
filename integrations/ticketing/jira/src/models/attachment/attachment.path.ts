import { BasePath, Config, Params, User, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertAttachment } from './attachment.utils';

export class AttachmentPath extends BasePath<User> {
  async fetchSingleUser(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return convertAttachment(response.data)
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<User>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/attachment/${params.pathParams?.attachment_id}`;
        return this.fetchSingleUser(url, headers, params);

      default:
        return {};
    }
  }
}
