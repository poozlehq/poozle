/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import * as React from 'react';

import { UserContext } from 'store/user_context';

import styles from './account.module.scss';

interface Values {
  name: string;
}

export function Account() {
  const { firstname, lastname } = React.useContext(UserContext);
  const form = useForm({
    initialValues: {
      name: `${firstname} ${lastname}`,
    },

    validate: {
      name: (value) =>
        /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) ? null : 'Invalid name',
    },
  });

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  return (
    <Paper className={styles.container}>
      <div className={styles.header}>
        <Title order={6}>Account settings</Title>
      </div>

      <Group grow p="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="Elon Musk"
            required
            {...form.getInputProps('name')}
          />

          <Group position="right" mt="xl">
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Group>
    </Paper>
  );
}
