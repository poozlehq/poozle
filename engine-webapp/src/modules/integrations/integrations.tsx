/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Paper } from '@mantine/core';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { useExtensionAccountsQuery } from 'queries/generated/graphql';

import { Loader, Table } from 'components';

import { Header } from './header';
import styles from './integrations.module.scss';

export function Integrations() {
  const { defaultWorkspace } = React.useContext(UserContext);
  const { data, loading, error } = useExtensionAccountsQuery({
    variables: {
      workspaceId: defaultWorkspace.workspaceId,
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
      <Header />

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
