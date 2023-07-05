/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Divider, Group, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import {
  useGetIntegrationOAuthQuery,
  useUpdateIntegrationOAuthAppMutation,
} from 'services/integration_oauth';

import { Header, Loader } from 'components';

import styles from './update_o_auth.module.scss';
import { OAuthAppForm } from '../new_o_auth/o_auth_form';

export function UpdateOAuthApp() {
  const {
    query: { integrationOAuthAppId, workspaceId },
  } = useRouter();

  const { isLoading, data: integrationOAuthApp } = useGetIntegrationOAuthQuery({
    integrationOAuthAppId: integrationOAuthAppId as string,
    workspaceId: workspaceId as string,
  });

  const { mutate: updateIntegrationOAuthApp, isLoading: updateLoading } =
    useUpdateIntegrationOAuthAppMutation({
      onSuccess: (data) => {
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `Integration oAuth app ${data.integrationOAuthAppName} is updated`,
        });
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header title="Update OAuth App" />
      <Container>
        <Paper mt="lg" className={styles.container}>
          <Group p="md">
            <Title order={5}>Update the OAuth App </Title>
          </Group>
          <Divider className={styles.divider} />

          <Group pt="md">
            <OAuthAppForm
              workspaceId={workspaceId as string}
              update
              initialValues={{
                clientId: integrationOAuthApp.clientId,
                scopes: integrationOAuthApp.scopes,
                integrationOAuthAppName:
                  integrationOAuthApp.integrationOAuthAppName,
              }}
              loading={updateLoading}
              onSubmit={(values) => {
                updateIntegrationOAuthApp({
                  integrationOAuthAppName: values.integrationOAuthAppName,
                  clientId: values.clientId,
                  clientSecret: values.clientSecret,
                  scopes: values.scopes,
                  integrationOAuthAppId: integrationOAuthAppId as string,
                });
              }}
            />
          </Group>
        </Paper>
      </Container>
    </>
  );
}

UpdateOAuthApp.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
