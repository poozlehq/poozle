/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities/integrationOAuthApp.entity';
import { Button, Paper, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationOAuthApps } from 'services/integration_oauth/get_integration_oauth_apps';

import { IntegrationIcon, Header, Loader, Table } from 'components';

import styles from './o_auth_apps.module.scss';

export function OAuthApps() {
  const router = useRouter();

  const {
    query: { workspaceId },
  } = router;
  const { data: integrationOAuthApps, isLoading } = useGetIntegrationOAuthApps({
    workspaceId: workspaceId as string,
  });

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: IntegrationOAuthApp) => (
        <div className={styles.tableDataContainer}>
          {data['integrationOAuthAppName']}
        </div>
      ),
    },
    {
      name: 'Integration',
      key: 'integration',
      render: (data: IntegrationOAuthApp) => (
        <div className={styles.tableDataContainer}>
          <div className={styles.integrationName}>
            <IntegrationIcon
              icon={data.integrationDefinition.icon}
              width={25}
              height={25}
            />
            <Text>{data.integrationDefinition.name}</Text>
          </div>
        </div>
      ),
    },
    {
      name: 'Last Updated',
      key: 'last_updated',
      render: (data: IntegrationOAuthApp) => (
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
        title="OAuth Apps"
        actions={
          <Button onClick={() => router.push(`${router.asPath}/new`)}>
            + New OAuth app
          </Button>
        }
      />

      <div className={styles.tableContainer}>
        <Paper radius="md" className={styles.tablePaper}>
          <Table
            horizontalSpacing="lg"
            columns={columns}
            idKey="integrationAuthId"
            onRowClick={(id: string) => router.push(`${router.asPath}/${id}`)}
            data={integrationOAuthApps}
          />
        </Paper>
      </div>
    </div>
  );
}

OAuthApps.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
