/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Alert,
  Button,
  Container,
  Divider,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import {
  IntegrationType,
  IntegrationTypeSelectData,
} from 'lib/integration_type';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useCreateLinkMutation } from 'services/link';

import { Header } from 'components';

import styles from './new_link.module.scss';

export function NewLink() {
  const {
    query: { workspaceId },
  } = useRouter();
  const form = useForm({
    initialValues: {
      linkName: '',
      category: [],
      expiresIn: 3600,
    },
  });
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const { mutate: createLink, isLoading } = useCreateLinkMutation({
    onSuccess: () => {
      notifications.show({
        icon: <IconCheck />,
        title: 'Status',
        color: 'green',
        message: `Link created.`,
      });
      form.reset();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  return (
    <>
      <Header title="New Link" />
      <Container>
        <Paper mt="lg" className={styles.container}>
          <Group p="md">
            <Title order={5}>Create a new Link </Title>
          </Group>
          <Divider className={styles.divider} />

          <Group p="md" pt="md" className={styles.formContainer}>
            <form
              className={styles.form}
              onSubmit={form.onSubmit((values) => {
                createLink({
                  ...values,
                  workspaceId: workspaceId as string,
                });
              })}
            >
              <TextInput
                pb="md"
                label="Link name"
                description="You can use to differentiate company"
                placeholder="Enter link name"
                {...form.getInputProps('linkName')}
              />
              <NumberInput
                pb="md"
                label="Link expiry limit"
                description="In seconds"
                placeholder="Enter time after which link expires"
                {...form.getInputProps('expiresIn')}
              />
              <MultiSelect
                pb="md"
                label="Choose category"
                data={Object.keys(IntegrationType).map((value) => ({
                  label: IntegrationTypeSelectData[value as IntegrationType],
                  value,
                }))}
                multiple
                searchable
                {...form.getInputProps('category')}
              />

              {errorMessage && (
                <Alert
                  color="red"
                  mt="md"
                  icon={<IconAlertCircle size="1rem" />}
                  title="Error!"
                >
                  {<>{errorMessage}</>}
                </Alert>
              )}
              <Group pt="xl" position="right">
                <Button type="submit" loading={isLoading}>
                  Create
                </Button>
              </Group>
            </form>
          </Group>
        </Paper>
      </Container>
    </>
  );
}

NewLink.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
