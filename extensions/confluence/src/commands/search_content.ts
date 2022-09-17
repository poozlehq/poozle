import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';

import { SearchContentAction } from '../actions';

import { Space, Spaces, Content, Contents } from '../types';

import { apiGet } from '../utils/api';

const { Option } = Builder;
export class SearchContentCommand extends AbstractCommand {
  key = 'search-content';
  name = 'Search content';
  description = 'Search Content';
  icon = 'jira.svg';

  fetchDataKeys: Array<string> = ['space_name', 'search_content'];

  path = '';
  basePath = 'https://{subdomain}.atlassian.net';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SearchContentAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any) {
    if (key === 'space_name') {
      const path = `https://${spec.confluence_domain}.atlassian.net/wiki/rest/api/space`;

      const apiParams = { type: 'global', limit: 100 };

      const spaces: Spaces = await apiGet<Spaces>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams,
      );

      spaces.results.map((space: Space) => {});
      return spaces.results.map((space: Space) => {
        return Option({
          text: space.name,
          icon: space._expandable.icon,
          value: space.key,
        }).build();
      });
    } else if (key === 'search_content') {
      const path = `https://${spec.confluence_domain}.atlassian.net//wiki/rest/api/search`;

      const apiParams = {
        cql: `space = ${params.space_key} and text ~'${params.search_key}'`,
        maxResults: 15,
      };

      const contents: Contents = await apiGet<Contents>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams,
      );

      return contents.results.map((content: Content) => {
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
