import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';

import { GetMentionsAction } from '../actions';

import { Mention, Mentions } from '../types';

import { apiGet } from '../utils/api';

const { Option } = Builder;
export class GetMentionsCommand extends AbstractCommand {
  key = 'get-mentions';
  name = 'Get Mentions';
  description = 'Get Mentions';
  icon = 'confluence.svg';

  fetchDataKeys: Array<string> = ['search_mentions'];

  path = '';
  basePath = 'https://{subdomain}.atlassian.net';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new GetMentionsAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any) {
    if (key === 'search_mentions') {
      const path = `https://${spec.confluence_domain}.atlassian.net//wiki/rest/api/search`;

      const apiParams = {
        cql: `mention = currentUser() order by lastmodified desc`,
        maxResults: 15,
      };

      const contents: Mentions = await apiGet<Mentions>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams,
      );

      return contents.results.map((content: Mention) => {
        return SearchResult({
          text: content.title,
          icon: null,
          description: content.excerpt,
          url: content.content._links.self,
        }).build();
      });
    }
  }
}
