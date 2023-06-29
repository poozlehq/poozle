import { BasePath, Config, Params, User, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertAttachment } from './attachment.utils';

export class AttachmentsPath extends BasePath<User> {
  async fetchAttachments(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      const issues = response.data.issues;
      const attachments = issues.flatMap((issue: any) => issue.fields.attachment);

      const attachmentContents = attachments.map(async (attachment: any) => {
        const attachmentResponse = await axios.get(attachment.content, {
          headers,
          responseType: 'arraybuffer',
        });

        return {
          attachmentId: attachment.id,
          filename: attachment.filename,
          content: attachmentResponse.data,
        };
      });

      return attachmentContents.map((data: any) => convertAttachment(data));
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
        url = `${BASE_URL}/rest/api/2/search?jql=project=${params.pathParams?.collection_id} AND attachments is not empty&fields=attachments`;
        return this.fetchAttachments(url, headers, params);

      default:
        return {};
    }
  }
}
