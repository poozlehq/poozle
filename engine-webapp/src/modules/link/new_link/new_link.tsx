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
  Select,
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

import { CopyLinkModal } from './copy_link_modal';
import styles from './new_link.module.scss';

export function NewLink() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const form = useForm({
    initialValues: {
      linkName: '',
      category: [],
      expiresIn: 0,
      canExpire: 'No',
      preferOAuth: 'Yes',
    },
  });
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [createdLink, setCreatedLink] = React.useState(undefined);

  const { mutate: createLink, isLoading } = useCreateLinkMutation({
    onSuccess: (data) => {
      notifications.show({
        icon: <IconCheck />,
        title: 'Status',
        color: 'green',
        message: `Link created.`,
      });
      setCreatedLink(data);

      form.reset();
    },
    onError: (err) => {
      setErrorMessage(err);
    },
  });

  return (
    <>
      <Header title="New Link" showBack />
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
                  preferOAuth: values.preferOAuth === 'Yes' ? true : false,
                  canExpire: values.canExpire === 'Yes' ? true : false,
                  workspaceId: workspaceId as string,
                });
              })}
            >
              <TextInput
                pb="md"
                label="Link name"
                description="You can use Organisation name"
                placeholder="Enter link name"
                {...form.getInputProps('linkName')}
              />

              <Select
                pb="md"
                label="Link expires?"
                data={['Yes', 'No']}
                searchable
                {...form.getInputProps('canExpire')}
              />
              {form.values.canExpire === 'Yes' && (
                <NumberInput
                  pb="md"
                  label="Link expiry limit"
                  description="In seconds"
                  placeholder="Enter time after which link expires"
                  {...form.getInputProps('expiresIn')}
                />
              )}
              <Select
                pb="md"
                label="Strongly prefer OAuth based authentication"
                data={['Yes', 'No']}
                searchable
                {...form.getInputProps('preferOAuth')}
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

        {createdLink && (
          <CopyLinkModal
            opened={!!createdLink}
            link={createdLink}
            onClose={() => {
              setCreatedLink(undefined);
            }}
          />
        )}
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
