/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Paper } from '@mantine/core';
import { useRouter } from 'next/router';

import { useGetExtensionAccountQuery } from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Loader } from 'components';

import styles from './update_extension.module.scss';
import { UpdateExtensionForm } from './update_extension_form';

export function UpdateExtension() {
  const {
    query: { extensionAccountId },
  } = useRouter();

  const { data, loading } = useGetExtensionAccountQuery({
    variables: { extensionAccountId: extensionAccountId as string },
  });

  return (
    <>
      <Header title="Extension" />

      <Container mt="lg">
        <Paper mt="xl" className={styles.container}>
          {loading ? (
            <Loader />
          ) : (
            <UpdateExtensionForm
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              extensionAccount={data.getExtensionAccount as any}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

UpdateExtension.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
