/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Paper } from '@mantine/core';
import { useRouter } from 'next/router';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationAccountQuery } from 'services/integration_account';

import { Header, Loader } from 'components';

import styles from './update_integration_account.module.scss';
import { UpdateIntegrationForm } from './update_integration_account_form';

export function UpdateIntegration() {
  const {
    query: { integrationAccountId },
  } = useRouter();

  const {
    data: integrationAccount,
    isLoading,
    refetch,
  } = useGetIntegrationAccountQuery({
    integrationAccountId: integrationAccountId as string,
  });

  console.log(integrationAccount);

  return (
    <>
      <Header title="Integration" />

      <Paper m="xl" className={styles.container}>
        {isLoading && !integrationAccount ? (
          <Loader />
        ) : (
          <UpdateIntegrationForm
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            integrationAccount={integrationAccount as any}
            onComplete={() => {
              refetch();
            }}
          />
        )}
      </Paper>
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
