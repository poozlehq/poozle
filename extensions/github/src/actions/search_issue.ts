import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';

const { Search, Input, Select, TextInput } = Builder;

export class SearchIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://api.github.com';
  key = /search-issue*/i;

  path = '{OWNER}/{REPO}/issues';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: Spec,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'search-issue') {
      return Search()
        .blocks(
          Input({
            label: 'Repository Name',
          }).element(
            Select().fetchDataId('repository_name').actionId('repository_name'),
          ),
        )
        .fetchDataId('search_issue');
    }

    return undefined;
  }
}
