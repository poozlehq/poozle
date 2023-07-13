/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Container, Divider, Group, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationDefinitionsQuery } from 'services/integration_definition';
import { useCreateIntegrationOAuthMutation } from 'services/integration_oauth/create_integration_oauth_app';

import { Header, Select } from 'components';

import styles from './new_o_auth.module.scss';
import { OAuthAppForm } from './o_auth_form';

export function NewOAuthApp() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const { data: integrationDefinitions } = useGetIntegrationDefinitionsQuery({
    workspaceId: workspaceId as string,
  });
  const [error, setError] = React.useState(undefined);
  const [selectedIntegrationDefinition, setIntegrationDefinition] =
    React.useState(undefined);
  const { mutate: createIntegrationOAuthApp, isLoading } =
    useCreateIntegrationOAuthMutation({
      onSuccess: (data) => {
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `Integration oAuth app ${data.integrationOAuthAppName} is created`,
        });

        setError(undefined);
      },
      onError: (err) => {
        setError(err);
      },
    });

  const getSelectData = () => {
    if (integrationDefinitions) {
      return integrationDefinitions.map((integrationDefinition) => ({
        value: integrationDefinition.integrationDefinitionId,
        label: integrationDefinition.name,
        image: integrationDefinition.icon,
      }));
    }

    return [];
  };

  return (
    <>
      <Header title="New OAuth App" showBack />
      <Container>
        <Paper mt="lg" className={styles.container}>
          <Group p="md">
            <Title order={5}>Set up the OAuth App </Title>
          </Group>
          <Divider className={styles.divider} />

          <Group p="md">
            {error && (
              <Alert
                color="red"
                mt="md"
                icon={<IconAlertCircle size="1rem" />}
                title="Error!"
              >
                {<>{error}</>}
              </Alert>
            )}
          </Group>
          <Group p="md" className={styles.group}>
            <Select
              label="Integration type"
              data={getSelectData()}
              searchable
              onChange={(value: string) => setIntegrationDefinition(value)}
              className={styles.integrationSelect}
            ></Select>
          </Group>

          <Group>
            {selectedIntegrationDefinition && (
              <OAuthAppForm
                workspaceId={workspaceId as string}
                update={false}
                initialValues={{}}
                onSubmit={(values) => {
                  createIntegrationOAuthApp({
                    integrationDefinitionId: selectedIntegrationDefinition,
                    integrationOAuthAppName: values.integrationOAuthAppName,
                    clientId: values.clientId,
                    clientSecret: values.clientSecret,
                    scopes: values.scopes,
                    workspaceId: workspaceId as string,
                  });
                }}
                loading={isLoading}
              />
            )}
          </Group>
        </Paper>
      </Container>
    </>
  );
}

NewOAuthApp.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
