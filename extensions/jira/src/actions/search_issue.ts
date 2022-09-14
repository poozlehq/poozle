import { ActionParams, Spec, HTTPAction, Builder,  } from '@poozle/edk';

const { Search, Input, Select, TextInput, QuickAction, QuickActionTypeEnum } = Builder;

export class SearchIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://{subdomain}.atlassian.net';
  key = /search-issue*/i;

  path = '';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'search-issue') {
      return Search()
      .blocks(
        Input({
          label: 'Project Name',
        }).element(
          Select().fetchDataId('project_name').actionId('project_key'),
        ),
        Input({
          label: 'Issue',
        }).element(
          TextInput({ placeholder: 'Search any issue' }).actionId(
            'issue_name',
          ),
        ),
      ).fetchDataId('search_issue').actionId('issue').callbackId('search_issue_open_issue');
    }
    else if(callback_id == 'search-issue-open') {
      return QuickAction({
        quickActionType: QuickActionTypeEnum.OPEN,
        value: params.url,
        title: params.text
      })
    }
  }
}
