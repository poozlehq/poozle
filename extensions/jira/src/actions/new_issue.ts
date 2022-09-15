import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';
import { apiPost } from '../utils/api';

const { Input, Form, TextInput, Select, TextEditor, Section } = Builder;

export class NewIssueAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://{subdomain}.atlassian.net';
  key = /new-issue*/i;

  path = '';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: Spec,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'new-issue') {
      return Form()
        .blocks(
          Input({
            label: 'Project Name',
          }).element(
            Select().fetchDataId('project_name').actionId('project_key'),
          ),
          Section()
            .blocks(
              Input({
                label: 'Issue Type',
              }).element(
                Select().fetchDataId('issue_type').actionId('issue_type_key'),
              ),
              Input({
                label: 'Issue Title',
              }).element(
                TextInput({ placeholder: 'Enter the issue title' }).actionId(
                  'issue_name',
                ),
              ),
              Input({
                label: 'Issue Description',
              }).element(TextEditor().actionId('issue_description')),
              Input({
                label: 'Parent Issue',
              })
                .element(
                  Select()
                    .searchDataId('issue_name')
                    .fetchDataId('parent_issue')
                    .actionId('parent_key'),
                )
                .optional(true),
              Input({
                label: 'Assignee',
              }).element(
                Select().fetchDataId('assignee').actionId('assignee_key'),
              ),
            )
            .conditionalCheck(['project_key']),
        )
        .callbackId('new-issue-submitted');
    }

    if (callback_id === 'new-issue-submitted') {
      const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/issue`;
      const values = {
        update: {},
        fields: {
          summary: params.issue_name,
          parent: {
            key: params.parent_key,
          },
          issuetype: {
            id: params.issue_type_key,
          },
          project: {
            id: params.project_key,
          },
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: params.description,
                    type: 'text',
                  },
                ],
              },
            ],
          },
          assignee: {
            id: params.assignee_key,
          },
        },
      };

      await apiPost(path, spec.email_id, spec.api_key, values);
    }

    return undefined;
  }
}
