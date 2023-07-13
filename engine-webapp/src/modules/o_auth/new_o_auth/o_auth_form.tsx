/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import * as React from 'react';

import styles from './o_auth_form.module.scss';

interface OAuthAppFormProps {
  workspaceId: string;
  initialValues: Formvalues;
  onSubmit: (values: Formvalues) => void;
  loading: boolean;
  update: boolean;
}

interface Formvalues {
  clientId?: string;
  clientSecret?: string;
  scopes?: string;
  integrationOAuthAppName?: string;
}

export function OAuthAppForm({
  onSubmit,
  initialValues,
  loading,
  update,
}: OAuthAppFormProps) {
  const form = useForm({
    initialValues: {
      clientId: initialValues.clientId || '',
      clientSecret: initialValues.clientSecret || '',
      integrationOAuthAppName: initialValues.integrationOAuthAppName || '',
      scopes: initialValues.scopes || '',
    },

    validate: {
      clientId: (value) => (value ? null : 'Invalid Client Id'),
      clientSecret: (value) => (value ? null : 'Invalid Client Secret'),
      integrationOAuthAppName: (value) => (value ? null : 'Invalid Name'),
    },
  });

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
          form.reset();
        })}
      >
        <TextInput
          pb="md"
          label="Integration auth name"
          disabled={update}
          placeholder="Enter integration OAuth App name"
          description="This will be used in the app to fetch redirect URL"
          {...form.getInputProps('integrationOAuthAppName')}
        />
        <TextInput
          pb="md"
          label="Client Id"
          placeholder="Enter Client Id"
          {...form.getInputProps('clientId')}
        />
        <TextInput
          pb="md"
          label="Client Secret"
          placeholder="Enter Client Secret"
          {...form.getInputProps('clientSecret')}
        />

        <TextInput
          pb="md"
          label="Scope"
          placeholder="Enter scopes"
          {...form.getInputProps('scopes')}
        />

        <Group pt="xl" position="right">
          <Button type="submit" loading={loading}>
            {update ? 'Update' : 'Create'}
          </Button>
        </Group>
      </form>
    </Group>
  );
}
