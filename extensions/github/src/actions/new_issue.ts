import { ActionParams, Authentication, HTTPAction, Builder } from '@poozle/edk';

const { Input, Form, TextInput, Section, Select } = Builder;

export class NewIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://api.github.com/repos';
  key = /new-issue*/i;

  path = '{OWNER}/{REPO}/issues';

  run(
    callback_id: string,
    params: ActionParams,
    authentication: Authentication,
  ): Builder.Surface | undefined {
    if (callback_id === 'new-issue') {
      return Form()
        .blocks(
          Input({
            label: 'Repository Name',
          }).element(
            Select().fetchDataId('repository_name').actionId('repository_name'),
          ),
          Section()
            .blocks(
              Input({
                label: 'Issue Title',
              }).element(
                TextInput({ placeholder: 'Enter the issue title' }).actionId(
                  'issue_title',
                ),
              ),
              Input({
                label: 'Issue Description',
              }).element(
                TextInput({
                  placeholder: 'Enter the issue description',
                }).actionId('issue_description'),
              ),
            )
            .conditionalCheck(['repository_name']),
        )
        .callbackId('new-issue-submitted');
    }

    if (callback_id === 'new-issue-submitted') {
      console.log(callback_id, params, authentication);
    }

    return undefined;
  }
}
