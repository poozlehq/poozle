/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  ExtensionAccount,
  useExtensionAccountsQuery,
} from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { ExtensionIcon, Header, Loader, Table } from 'components';

import styles from './extension.module.scss';

export function Extension() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const { data, loading, error } = useExtensionAccountsQuery({
    variables: {
      workspaceId: workspaceId as string,
    },
  });

  console.log(data, loading, error);

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: ExtensionAccount) => (
        <div className={styles.tableDataContainer}>
          {data['extensionAccountName']}
        </div>
      ),
    },
    {
      name: 'Integration',
      key: 'integration',
      render: (data: ExtensionAccount) => (
        <div className={styles.tableDataContainer}>
          <div className={styles.extensionName}>
            <ExtensionIcon icon="github.svg" width={25} height={25} />
            <Text>{data['name']}</Text>
          </div>
        </div>
      ),
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
      render: (data: ExtensionAccount) => (
        <div className={styles.tableDataContainer}>
          {new Date(data.updatedAt).toLocaleString()}
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        title="Extensions"
        actions={
          <Button onClick={() => router.push(`${router.asPath}/new`)}>
            + New Extension
          </Button>
        }
      />

      <div className={styles.tableContainer}>
        <Paper radius="md" className={styles.tablePaper}>
          <Table
            horizontalSpacing="lg"
            columns={columns}
            idKey="extensionAccountId"
            onRowClick={(id: string) => router.push(`${router.asPath}/${id}`)}
            data={data.getExtensionAccountsByWorkspace}
          />
        </Paper>
      </div>
    </div>
  );
}

Extension.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
