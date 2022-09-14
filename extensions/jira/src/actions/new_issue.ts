import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';
import { SectionBuilder } from '@poozle/edk/lib/cjs/builder';

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
                Select().fetchDataId('assignee').actionId('assinee_key'),
              ),
            )
            .conditionalCheck(['project_key']),
        )
        .callbackId('new-issue-submitted');
    }

    if (callback_id === 'new-issue-submitted') {
      const path = `${this.baseUrl}/${params.repository_name}/issues`;
      const values = {
        update: {},
        fields: {
          summary: 'Main order flow broken',
          parent: {
            key: 'PROJ-123',
          },
          issuetype: {
            id: '10000',
          },
          project: {
            id: '10000',
          },
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: 'Order entry fails when selecting supplier.',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          duedate: '2019-05-11',
          assignee: {
            id: '5b109f2e9729b51b54dc274d',
          },
        },
      };

      await apiPost(path, spec.email_id, spec.api_key, values);
    }

    return undefined;
  }
}
