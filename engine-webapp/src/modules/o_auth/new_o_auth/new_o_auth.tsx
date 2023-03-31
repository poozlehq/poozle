/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Divider, Group, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useCreateExtensionAuthMutation,
  useExtensionDefinitionsQuery,
} from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Select } from 'components';

import styles from './new_o_auth.module.scss';
import { OAuthAppForm } from './o_auth_form';

export function NewOAuthApp() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const { data } = useExtensionDefinitionsQuery({
    variables: {
      workspaceId: workspaceId as string,
    },
  });
  const [selectedExtensionDefinition, setExtensionDefinition] =
    React.useState(undefined);
  const [createExtensionAuth, { loading }] = useCreateExtensionAuthMutation();

  const getSelectData = () => {
    if (data) {
      return data.getExtensionDefinitionsByWorkspace.map(
        (extensionDefinition) => ({
          value: extensionDefinition.extensionDefinitionId,
          label: extensionDefinition.name,
          image: extensionDefinition.icon,
        }),
      );
    }

    return [];
  };

  return (
    <>
      <Header title="New OAuth App" />
      <Container>
        <Paper mt="lg" className={styles.container}>
          <Group p="md">
            <Title order={5}>Set up the OAuth App </Title>
          </Group>
          <Divider className={styles.divider} />

          <Group p="md" className={styles.group}>
            <Select
              label="Extension type"
              data={getSelectData()}
              searchable
              onChange={(value: string) => setExtensionDefinition(value)}
              className={styles.integrationSelect}
            ></Select>
          </Group>

          <Group>
            {selectedExtensionDefinition && (
              <OAuthAppForm
                workspaceId={workspaceId as string}
                update={false}
                initialValues={{}}
                onSubmit={(values) => {
                  createExtensionAuth({
                    variables: {
                      extensionCreateBody: {
                        extensionDefinitionId: selectedExtensionDefinition,
                        extensionAuthName: values.extensionAuthName,
                        clientId: values.clientId,
                        clientSecret: values.clientSecret,
                        scopes: values.scopes,
                        workspaceId: workspaceId as string,
                      },
                    },
                    onCompleted: () => {
                      router.push(`/workspaces/${workspaceId}/o_auth`);
                    },
                    onError: (error) => {
                      notifications.show({
                        title: 'Error',
                        color: 'red',
                        variant: 'filled',
                        message: error.message,
                      });
                    },
                  });
                }}
                loading={loading}
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
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
