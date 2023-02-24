/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Paper } from '@mantine/core';
import * as React from 'react';

import { Table } from 'components';

import { Header } from './header';
import styles from './integrations.module.scss';

export function Integrations() {
  const columns = [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Integration',
      key: 'integration',
    },
    {
      name: 'Status',
      key: 'status',
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
    },
  ];

  return (
    <div>
      <Header />

      <div className={styles.tableContainer}>
        <Paper shadow="xs">
          <Table columns={columns} data={[]} />
        </Paper>
      </div>
    </div>
  );
}
