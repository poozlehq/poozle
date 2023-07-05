/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Button,
  Group,
  NumberInput,
  Paper,
  TextInput,
  Title,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useCreateTokenMutation } from 'services/user';

import styles from './api_keys.module.scss';

interface Values {
  name: string;
  seconds: number;
}

export function APIKeys() {
  const form = useForm({
    initialValues: {
      name: '',
      seconds: 0,
    },
  });
  const [token, setToken] = React.useState('');
  const { mutate: createToken, isLoading } = useCreateTokenMutation({
    onSuccess: (data) => {
      setToken(data);
      form.reset();
    },
  });

  const onSubmit = (values: Values) => {
    createToken(values);
  };

  return (
    <Paper className={styles.container}>
      <div className={styles.header}>
        <Title order={6}>API Keys</Title>
      </div>

      <Group grow p="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="Token name"
            required
            {...form.getInputProps('name')}
          />

          <NumberInput
            label="Seconds"
            mt="md"
            placeholder="Time this token should be valid for "
            required
            {...form.getInputProps('seconds')}
          />

          <Group position="right" mt="xl">
            <Button type="submit" loading={isLoading}>
              Create token
            </Button>
          </Group>
        </form>
      </Group>

      <Group mt="lg" grow p="lg">
        {token && (
          <Textarea
            label="Copy the below token"
            description="This is not displayed again"
            value={token}
          ></Textarea>
        )}
      </Group>
    </Paper>
  );
}
