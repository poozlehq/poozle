/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Group, Paper, Text, Stack, Tabs } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconLine, IconSettings } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { showDateInUI } from 'utils';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import {
  useGetIntegrationOAuthQuery,
  useUpdateIntegrationOAuthAppMutation,
} from 'services/integration_oauth';

import { Header, IntegrationIcon, IntegrationType, Loader } from 'components';

import { Settings } from './settings';
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
      <Header
        title={
          <Group align="center">
            <Text>{integrationOAuthApp.integrationOAuthAppName}</Text>
            <IntegrationType
              type={integrationOAuthApp.integrationDefinition.integrationType}
            />
            <IntegrationIcon
              icon={integrationOAuthApp.integrationDefinition.icon}
              height={20}
              width={20}
            />
          </Group>
        }
        description="Manage the OAuth app"
        actions={
          <Text size="sm" color="gray">
            Created {showDateInUI(integrationOAuthApp.createdAt)}
          </Text>
        }
      />

      <Stack>
        <Tabs defaultValue="overview" pt="lg" px="xl">
          <Tabs.List className={styles.tabList} mb="xl">
            <Tabs.Tab
              className={styles.tab}
              icon={<IconLine size="1.25rem" />}
              value="overview"
            >
              Overview
            </Tabs.Tab>
            <Tabs.Tab
              className={styles.tab}
              icon={<IconSettings size="1.25rem" />}
              value="settings"
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <Paper className={styles.container}>
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
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <Settings
              integrationOAuthAppId={integrationOAuthApp.integrationOAuthAppId}
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>
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
