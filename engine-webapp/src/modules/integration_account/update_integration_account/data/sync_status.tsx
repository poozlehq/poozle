/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { JobStatus } from '@@generated/job/entities';
import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCheck, IconLoader, IconX } from '@tabler/icons-react';

import styles from './sync_status.module.scss';

interface SyncStatusProps {
  status: JobStatus;
  failedMessage?: string;
}

export function SyncStatus({ status, failedMessage }: SyncStatusProps) {
  if (status === JobStatus.FAILED) {
    return (
      <Stack spacing={5}>
        <Group spacing="xs">
          <ThemeIcon color="red" size="sm">
            <IconX />
          </ThemeIcon>
          <Text> Failed </Text>
        </Group>

        {failedMessage && (
          <Text
            color="gray"
            size="xs"
            lineClamp={2}
            className={styles.failedMessage}
          >
            {failedMessage}
          </Text>
        )}
      </Stack>
    );
  }

  if (status === JobStatus.RUNNING) {
    return (
      <Stack spacing="xs">
        <Group spacing="xs">
          <ThemeIcon color="primary" size="sm">
            <IconLoader />
          </ThemeIcon>
          <Text> Running </Text>
        </Group>
      </Stack>
    );
  }

  return (
    <>
      <Group>
        <ThemeIcon color="green" size="sm">
          <IconCheck />
        </ThemeIcon>
        <Text> Done </Text>
      </Group>
    </>
  );
}
