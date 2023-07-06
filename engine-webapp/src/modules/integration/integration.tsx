/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationAccounts } from 'services/integration_account';

import {
  IntegrationIcon,
  Header,
  Loader,
  Table,
  IntegrationType,
} from 'components';

import styles from './integration.module.scss';

export function Integration() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;

  const { data: integrationAccounts, isLoading } = useGetIntegrationAccounts({
    workspaceId: workspaceId as string,
  });

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: IntegrationAccount) => (
        <div className={styles.tableDataContainer}>
          {data['integrationAccountName']}
        </div>
      ),
    },
    {
      name: 'Integration',
      key: 'integration',
      render: (data: IntegrationAccount) => (
        <div className={styles.tableDataContainer}>
          <div className={styles.integrationName}>
            <IntegrationIcon
              icon={data.integrationDefinition.icon}
              width={25}
              height={25}
            />
            <Text pl="xs">{data.integrationDefinition.name}</Text>
          </div>
        </div>
      ),
    },
    {
      name: 'Category',
      key: 'category',
      render: (data: IntegrationAccount) => (
        <div className={styles.tableDataContainer}>
          <IntegrationType
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type={data.integrationDefinition.integrationType as any}
          />
        </div>
      ),
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
      render: (data: IntegrationAccount) => (
        <div className={styles.tableDataContainer}>
          {new Date(data.updatedAt).toLocaleString()}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        title="Integrations"
        actions={
          <Button onClick={() => router.push(`${router.asPath}/new`)}>
            + New Integration
          </Button>
        }
      />

      <div className={styles.tableContainer}>
        <Paper radius="md" className={styles.tablePaper}>
          <Table
            horizontalSpacing="lg"
            columns={columns}
            idKey="integrationAccountId"
            onRowClick={(id: string) => router.push(`${router.asPath}/${id}`)}
            data={integrationAccounts}
          />
        </Paper>
      </div>
    </div>
  );
}

Integration.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
