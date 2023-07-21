/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Link } from '@@generated/link/entities';
import {
  ActionIcon,
  Button,
  CopyButton,
  Group,
  Paper,
  ThemeIcon,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconAlertSmall, IconCheck, IconCopy } from '@tabler/icons-react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { showDateInTable } from 'utils';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetLinksQuery } from 'services/link';

import { Header, IntegrationType, Loader, Table } from 'components';

import styles from './link.module.scss';

const { publicRuntimeConfig } = getConfig();

export function LinkComponent() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;

  const { data: links, isLoading } = useGetLinksQuery({
    workspaceId: workspaceId as string,
  });

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: Link) => (
        <div className={styles.tableDataContainer}>{data['linkName']}</div>
      ),
    },
    {
      name: 'Categories',
      key: 'category',
      render: (data: Link) => (
        <div className={styles.tableDataContainer}>
          <div className={styles.linkName}>
            <Group>
              {data.category.map((cat) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <IntegrationType type={cat as any} />
              ))}
            </Group>
          </div>
        </div>
      ),
    },

    {
      name: 'Created',
      key: 'created',
      render: (data: Link) => (
        <Text className={styles.tableDataContainer} size="xs" color="gray">
          {showDateInTable(data.createdAt)}
        </Text>
      ),
    },

    {
      name: 'Status',
      key: 'status',
      render: (data: Link) => (
        <div className={styles.tableDataContainer}>
          {!data.expired ? (
            <ThemeIcon size="sm" color="green">
              <IconCheck size="1.2rem" />
            </ThemeIcon>
          ) : (
            <ThemeIcon size="sm" color="red">
              <IconAlertSmall size="1.2rem" />
            </ThemeIcon>
          )}
        </div>
      ),
    },
    {
      name: 'Actions',
      key: 'actions',
      render: (data: Link) => (
        <CopyButton
          value={`${publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST}/link/${data.linkId}`}
          timeout={2000}
        >
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Copied' : 'Copy link URL'}
              withArrow
              position="right"
            >
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        title="Links"
        description="Create links to send your users a secure URL to authorize their integrations in production"
        actions={
          <Button onClick={() => router.push(`${router.asPath}/new`)}>
            + New Link
          </Button>
        }
      />

      <div className={styles.tableContainer}>
        <Paper radius="md" className={styles.tablePaper}>
          <Table
            horizontalSpacing="lg"
            columns={columns}
            idKey="linkId"
            data={links}
          />
        </Paper>
      </div>
    </div>
  );
}

LinkComponent.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
