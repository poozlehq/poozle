/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Group, Paper, Text } from '@mantine/core';

import styles from './stats_card.module.scss';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Paper withBorder p="md" radius="md" key="Title">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={styles.title}>
          {title}
        </Text>
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={styles.value}>{value}</Text>
      </Group>

      {description && (
        <Text fz="xs" c="dimmed" mt={7}>
          {description}
        </Text>
      )}
    </Paper>
  );
}
