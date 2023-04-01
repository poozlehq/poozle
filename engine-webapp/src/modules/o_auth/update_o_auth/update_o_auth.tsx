/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Divider, Group, Paper, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useGetExtensionAuthQuery,
  useUpdateExtensionAuthMutation,
} from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Loader } from 'components';

import styles from '../new_o_auth/new_o_auth.module.scss';
import { OAuthAppForm } from '../new_o_auth/o_auth_form';

export function UpdateOAuthApp() {
  const router = useRouter();
  const {
    query: { workspaceId, extensionAuthId },
  } = router;

  const [updateExtensionAuth, { loading }] = useUpdateExtensionAuthMutation();
  const { data: extensionAuth, loading: loadingExtensionAuth } =
    useGetExtensionAuthQuery({
      variables: {
        extensionAuthId: extensionAuthId as string,
      },
    });

  if (loadingExtensionAuth || !extensionAuth) {
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
                clientId: extensionAuth.getExtensionAuth.clientId,
                scopes: extensionAuth.getExtensionAuth.scopes,
                extensionAuthName:
                  extensionAuth.getExtensionAuth.extensionAuthName,
              }}
              onSubmit={(values) => {
                updateExtensionAuth({
                  variables: {
                    extensionUpdateBody: {
                      extensionAuthName: values.extensionAuthName,
                      clientId: values.clientId,
                      clientSecret: values.clientSecret,
                      scopes: values.scopes,
                      extensionAuthId: extensionAuthId as string,
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
          </Group>
        </Paper>
      </Container>
    </>
  );
}

UpdateOAuthApp.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
