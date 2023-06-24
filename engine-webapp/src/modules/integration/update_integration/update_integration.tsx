/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Paper } from '@mantine/core';
import { useRouter } from 'next/router';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationAccountQuery } from 'services/integration_account';

import { Header, Loader } from 'components';

import styles from './update_integration.module.scss';
import { UpdateIntegrationForm } from './update_integration_form';

export function UpdateIntegration() {
  const {
    query: { integrationAccountId },
  } = useRouter();

  const { data: integrationAccount, isLoading } = useGetIntegrationAccountQuery(
    {
      integrationAccountId: integrationAccountId as string,
    },
  );

  return (
    <>
      <Header title="Integration" />

      <Container mt="lg">
        <Paper mt="xl" className={styles.container}>
          {isLoading ? (
            <Loader />
          ) : (
            <UpdateIntegrationForm
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              integrationAccount={integrationAccount as any}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

UpdateIntegration.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
