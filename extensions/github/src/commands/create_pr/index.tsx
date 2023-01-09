/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Button, ExtensionSpecDataType, Input } from '@poozle/edk';
import { FormView } from '@poozle/edk';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';

import { SelectData } from '../select_data';
import styles from './index.module.scss';

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const queryClient = new QueryClient();

const CreatePr = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const domain = `api.github.com`;
  const token = specData?.data.api_key;

  const form = useForm({
    initialValues: {
      repository: '',
      title: '',
      description: '',
      assignee: '',
      source_branch: '',
      base_branch: '',
    },
  });

  type FormValues = typeof form.values;

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await fetch(`https://${domain}/repos/${data.repositoryName}/pulls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data: any) => {
      if (data.status === 200 || data.status === 201) {
        showNotification({
          message: 'Created new issue 🤥',
        });
        form.reset();
      } else {
        // TODO: status 422 is not showing as error
        showNotification({
          color: 'red',
          message: 'Something went wrong',
        });
      }
    },
  });

  const onCreateIssue = (values: FormValues) => {
    return mutation.mutate({
      repositoryName: values.repository,
      title: values.title,
      body: values.description,
      head: values.source_branch,
      base: values.base_branch,
    });
  };

  return (
    <FormView onClose={() => resetCommand()}>
      <form onSubmit={form.onSubmit((values) => onCreateIssue(values))}>
        <div className={styles.inputContainer}>
          <SelectData
            token={token}
            domain={domain}
            path="/user/repos"
            label="Repository"
            labelKey="full_name"
            valueKey="full_name"
            placeholder="Choose your repository"
            {...form.getInputProps('repository')}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="Title"
            placeholder="Title of the new pull request"
            {...form.getInputProps('title')}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="Description"
            placeholder="Content of the pull request"
            {...form.getInputProps('description')}
          />
        </div>

        {form.values.repository && (
          <div className={styles.inputContainer}>
            <SelectData
              token={token}
              domain={domain}
              path={`/repos/${form.values.repository}/branches`}
              label="source_branches"
              labelKey="name"
              valueKey="name"
              placeholder="Choose Source"
              {...form.getInputProps('source_branch')}
            />
          </div>
        )}

        {form.values.repository && (
          <div className={styles.inputContainer}>
            <SelectData
              token={token}
              domain={domain}
              path={`/repos/${form.values.repository}/branches`}
              label="base_branches"
              labelKey="name"
              valueKey="name"
              placeholder="Choose Base"
              {...form.getInputProps('base_branch')}
            />
          </div>
        )}

        <div className={styles.inputContainer}>
          <Button size="sm" type="submit">
            Create PR
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
      <CreatePr {...props} />
    </QueryClientProvider>
  );
}
