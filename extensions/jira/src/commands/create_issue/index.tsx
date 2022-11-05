/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Body, Button, ExtensionSpecDataType, getHTTPApiClient, Input } from '@poozle/edk';
import { FormView } from '@poozle/edk';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';

import styles from './index.module.scss';
import { SelectData } from './select_data';

interface CommandProps {
  specData: ExtensionSpecDataType;
  resetCommand: () => void;
}

const queryClient = new QueryClient();

const CreateIssue = ({ specData }: CommandProps): React.ReactElement => {
  const domain = specData.data.jira_domain;
  const token = btoa(`${specData.data.email}:${specData.data.api_key}`);

  const form = useForm({
    initialValues: {
      project: '',
      issueType: '',
      summary: '',
      description: '',
      assignee: '',
      label: '',
      fixVersion: '',
    },
  });

  type FormValues = typeof form.values;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const client = await getHTTPApiClient();

      return await client.post(`${domain}/rest/api/3/issue`, Body.json(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`,
        },
      });
    },
    onSuccess: () => {
      showNotification({
        message: 'Created new issue 🤥',
      });
      form.reset();
    },
    onError: () => {
      showNotification({
        color: 'red',
        message: 'Something went wrong',
      });
    },
  });

  const onCreateIssue = (values: FormValues) => {
    return mutation.mutate({
      fields: {
        summary: values.summary,
        issuetype: {
          id: values.issueType,
        },
        project: {
          id: values.project,
        },
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  text: values.description,
                  type: 'text',
                },
              ],
            },
          ],
        },
        labels: [values.label],
        assignee: {
          id: values.assignee,
        },
      },
    });
  };

  return (
    <FormView onClose={() => console.log('closed')}>
      <form onSubmit={form.onSubmit((values) => onCreateIssue(values))}>
        <div className={styles.inputContainer}>
          <SelectData
            token={token}
            domain={domain}
            path="/rest/api/3/project/recent"
            label="Project"
            labelKey="name"
            valueKey="id"
            placeholder="Choose your project"
            {...form.getInputProps('project')}
          />
        </div>
        <div className={styles.inputContainer}>
          <SelectData
            token={token}
            domain={domain}
            path="/rest/api/3/issuetype"
            labelKey="name"
            valueKey="id"
            label="Issue type"
            placeholder="Choose your issue type"
            {...form.getInputProps('issueType')}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="Summary"
            placeholder="Short summary for the issue"
            {...form.getInputProps('summary')}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="Description"
            placeholder="Description"
            {...form.getInputProps('description')}
          />
        </div>

        <div className={styles.inputContainer}>
          <SelectData
            token={token}
            domain={domain}
            path="/rest/api/3/label?maxResults=1000"
            label="Label"
            placeholder="Choose label"
            {...form.getInputProps('label')}
          />
        </div>

        {form.values.project && (
          <div className={styles.inputContainer}>
            <SelectData
              token={token}
              domain={domain}
              path={`/rest/api/3/user/assignable/search?project=${form.values.project}`}
              labelKey="displayName"
              valueKey="accountId"
              label="Assignee"
              placeholder="Choose assignee"
              {...form.getInputProps('assignee')}
            />
          </div>
        )}

        {form.values.project && (
          <div className={styles.inputContainer}>
            <SelectData
              token={token}
              domain={domain}
              path={`/rest/api/3/project/${form.values.project}/versions`}
              label="Fix version"
              placeholder="Choose fix version"
              {...form.getInputProps('fixVersion')}
            />
          </div>
        )}

        <div className={styles.inputContainer}>
          <Button size="sm" type="submit">
            Create issue
          </Button>
        </div>
      </form>
    </FormView>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
export default function (props: CommandProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateIssue {...props} />
    </QueryClientProvider>
  );
}
