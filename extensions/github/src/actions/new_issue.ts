import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';

import { apiPost } from '../utils/api';

const { Input, Form, TextInput, Select, TextEditor } = Builder;

export class NewIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://api.github.com/repos';
  key = /new-issue*/i;

  path = '{OWNER}/{REPO}/issues';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'new-issue') {
      return Form()
        .blocks(
          Input({
            label: 'Repository Name',
          }).element(
            Select().fetchDataId('repository_name').actionId('repository_name'),
          ),
          Input({
            label: 'Issue Title',
          }).element(
            TextInput({ placeholder: 'Enter the issue title' }).actionId(
              'issue_title',
            ),
          ),
          Input({
            label: 'Issue Description',
          }).element(TextEditor().actionId('issue_description')),
        )
        .callbackId('new-issue-submitted');
    }

    if (callback_id === 'new-issue-submitted') {
      const path = `${this.baseUrl}/${params.repository_name}/issues`;
      const values = {
        title: params.issue_title,
        body: params.issue_description,
      };

      await apiPost(path, spec.api_key, values);
    }

    return undefined;
  }
}
