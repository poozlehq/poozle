/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { UserContext } from 'store/user_context';

import { useGeneralStatsQuery } from 'queries/generated/graphql';

import { BarChart, Loader } from 'components';

import styles from './monitoring.module.scss';
import { getErrorRate, getSuccessRate } from './monitoring.utils';
import { StatsCard } from './stats_card';

interface MonitoringProps {
  dates: {
    from: string;
    to: string;
  };
}

export function Monitoring(props: MonitoringProps) {
  const { from, to } = props.dates;
  const {
    query: { workspaceId },
  } = useRouter();
  const { Workspace } = React.useContext(UserContext);
  const theme = useMantineTheme();

  const workspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const { data, loading } = useGeneralStatsQuery({
    variables: {
      statsInput: {
        workspace: workspace.slug,
        from,
        to,
      },
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack p="xl">
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        <StatsCard
          title="Requests"
          value={data.getGeneralStats.totalRequests}
        />

        <StatsCard
          title="Unique Operations"
          value={data.getGeneralStats.totalOperations}
        />
        <StatsCard
          title="Success rate"
          value={`${getSuccessRate(
            data.getGeneralStats.totalFailures,
            data.getGeneralStats.totalRequests,
          )}%`}
        />
        <StatsCard
          title="Latency p99"
          value={`${data.getGeneralStats.duration.p99}ms`}
        />
        <StatsCard
          title="Latency p95"
          value={`${data.getGeneralStats.duration.p95}ms`}
        />
        <StatsCard
          title="Latency p90"
          value={`${data.getGeneralStats.duration.p90}ms`}
        />
        <StatsCard
          title="Error rate"
          value={`${getErrorRate(
            data.getGeneralStats.totalFailures,
            data.getGeneralStats.totalRequests,
          )}%`}
        />
      </SimpleGrid>

      <Paper p="md" withBorder className={styles.chart}>
        <div className={styles.chartContainer}>
          <Group position="apart">
            <div>
              <Title order={5}> Operations over time </Title>
              <Text size="sm" color="gray">
                Timeline of GraphQL requests and failures
              </Text>
            </div>
          </Group>

          <div className={styles.chartContainer}>
            <BarChart
              min={from}
              max={to}
              data={{
                datasets: [
                  {
                    label: 'Requests',
                    data: data.getGeneralStats.requestsOverTime.map(
                      (request) => ({
                        x: request.date,
                        y: request.value,
                      }),
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ) as any,
                    backgroundColor: theme.colors.blue[4],
                  },
                  {
                    label: 'Failure',
                    data: data.getGeneralStats.failuresOverTime.map(
                      (request) => ({
                        x: request.date,
                        y: request.value,
                      }),
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ) as any,
                    backgroundColor: theme.colors.red[4],
                  },
                ],
              }}
            />
          </div>
        </div>
      </Paper>
    </Stack>
  );
}
