/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Paper } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useExtensionAccountsQuery } from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Loader, Table } from 'components';

import styles from './integrations.module.scss';

export function Integrations() {
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
      render: (data: any) => (
        <div className={styles.tableDataContainer}>
          {data['extensionAccountName']}
        </div>
      ),
    },
    {
      name: 'Integration',
      key: 'integration',
      render: (data: any) => (
        <div className={styles.tableDataContainer}>{data['name']}</div>
      ),
    },
    {
      name: 'Status',
      key: 'status',
      render: (data: any) => (
        <div className={styles.tableDataContainer}>{data['name']}</div>
      ),
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
      render: (data: any) => (
        <div className={styles.tableDataContainer}>{data['name']}</div>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header title="Integrations" />

      <div className={styles.tableContainer}>
        <Paper shadow="xs" radius="md">
          <Table
            horizontalSpacing="lg"
            columns={columns}
            data={data.getExtensionAccountsByWorkspace}
          />
        </Paper>
      </div>
    </div>
  );
}

Integrations.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
