/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { Job } from '@@generated/job/entities';
import { Text, Tooltip, ActionIcon, Paper, Alert, Group } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import * as React from 'react';

import { useGetSyncScheduleQuery } from 'services/sync/get_schedule';

import { Loader, Table } from 'components';

import styles from './data.module.scss';
import { SyncStatus } from './sync_status';
import { showDateInUI } from '../../../../utils/common';

interface DataProps {
  integrationAccount: IntegrationAccount;
}

export function Data({ integrationAccount }: DataProps) {
  const { data: syncSchedule, isLoading } = useGetSyncScheduleQuery({
    integrationAccountId: integrationAccount.integrationAccountId,
  });

  const download = (content: string) => {
    // This creates the file.
    // In my case, I have an array, and each item in
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([content], { type: 'text/plain' });

    // update the download link state
    window.open(window.URL.createObjectURL(data), '_blank');
  };

  if (isLoading) {
    return <Loader />;
  }

  const columns = [
    {
      name: 'Status',
      key: 'status',
      render: (data: Job) => {
        return (
          <div className={styles.tableDataContainer}>
            <SyncStatus
              status={data.status}
              failedMessage={data.failedMessage}
            />
          </div>
        );
      },
    },
    {
      name: 'Sync start time',
      key: 'last_sync',
      render: (data: Job) => {
        return (
          <div className={styles.tableDataContainer}>
            <Text color="gray" size="xs">
              {showDateInUI(data.createdAt)}
            </Text>
          </div>
        );
      },
    },

    {
      name: 'Actions',
      key: 'action',
      render: (data: Job) => {
        return (
          <div className={styles.tableDataContainer}>
            <Tooltip label="Download logs" withArrow position="right">
              <ActionIcon color="gray" onClick={() => download(data.logs)}>
                <IconDownload size="1rem" />
              </ActionIcon>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.formContainer}>
      {syncSchedule.schedule?.info?.nextActionTimes && (
        <Alert color="primary" mb="md">
          <Group spacing={5}>
            <Text> Next sync will start at</Text>
            <Text fw={700}>
              {showDateInUI(
                new Date(syncSchedule.schedule?.info?.nextActionTimes[0]),
              )}
            </Text>
          </Group>
        </Alert>
      )}
      <Paper className={styles.container} mb="xl">
        <Table
          horizontalSpacing="lg"
          columns={columns}
          idKey="jobId"
          data={syncSchedule.jobs}
        />
      </Paper>
    </div>
  );
}
