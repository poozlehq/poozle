/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Paper } from '@mantine/core';
import { useRouter } from 'next/router';

import { useGetIntegrationAccountQuery } from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Loader } from 'components';

import styles from './update_integration.module.scss';
import { UpdateIntegrationForm } from './update_integration_form';

export function UpdateIntegration() {
  const {
    query: { integrationAccountId },
  } = useRouter();

  const { data, loading } = useGetIntegrationAccountQuery({
    variables: { integrationAccountId: integrationAccountId as string },
  });

  return (
    <>
      <Header title="Integration" />

      <Container mt="lg">
        <Paper mt="xl" className={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <UpdateIntegrationForm
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              integrationAccount={data.getIntegrationAccount as any}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

UpdateIntegration.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
