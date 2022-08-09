import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';
import { Issue } from '../types';

import { apiGet } from '../utils/api';

const { Search, Input, Select, TextInput, SearchResult } = Builder;

export class SearchIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://api.github.com';
  key = /search-issue*/i;

  path = '{OWNER}/{REPO}/issues';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'search-issue') {
      return Search()
      .blocks(
        Input({
          label: 'Repository Name',
        }).element(
          Select().fetchDataId('repository_name').actionId('repository_name'),
        ),
        Input({
          label: 'Issue',
        }).element(
          TextInput({ placeholder: 'Search any issue' }).actionId(
            'issue_name',
          ),
        ),
      ).fetchDataId('search_issue');
        
    }

    return undefined;
  }
}
