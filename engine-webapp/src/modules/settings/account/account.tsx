/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Group, Paper, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { useUpdateUserMutation } from 'queries/generated/graphql';

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
  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = (values: Values) => {
    updateUser({
      variables: {
        updateUser: {
          firstname: values.name.split(' ')[0],
          lastname: values.name.split(' ')[1],
        },
      },
      onCompleted: () => {
        notifications.show({
          title: 'Success',
          color: 'green',
          message: 'Updated successfully',
        });
      },
    });
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
            <Button type="submit" loading={loading}>
              Update
            </Button>
          </Group>
        </form>
      </Group>
    </Paper>
  );
}
