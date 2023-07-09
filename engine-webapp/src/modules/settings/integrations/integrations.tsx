/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import {
  Button,
  Group,
  Loader,
  Paper,
  Popover,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertSmall, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useGetIntegrationDefinitionsQuery,
  useUpdateIntegrationDefinitionMutation,
} from 'services/integration_definition';

import { IntegrationIcon, IntegrationType, Table } from 'components';
import { ReleaseStage } from 'components/release_stage';

import { AddNewIntegrationModal } from './add_new_integration_modal';
import styles from './integrations.module.scss';

interface UpdateComponentInterface {
  id: IntegrationDefinition;
  refetch: () => void;
}

function UpdateComponent({ id, refetch }: UpdateComponentInterface) {
  const {
    mutate: updateIntegrationDefinitionServer,
    isLoading: loadingUpdateIntegration,
  } = useUpdateIntegrationDefinitionMutation({
    onSuccess: () => {
      notifications.show({
        icon: <IconCheck />,
        title: 'Status',
        color: 'green',
        message: `Integration is updated successfully`,
      });
      refetch();
    },
    onError: (err) => {
      notifications.show({
        icon: <IconAlertSmall />,
        title: 'Status',
        color: 'red',
        message: err,
      });
    },
  });

  const updateIntegrationDefinition = (id: IntegrationDefinition) => {
    updateIntegrationDefinitionServer({
      integrationDefinitionId: id.integrationDefinitionId,
      sourceUrl: id.latestVersionSource,
      version: id.latestVersion,
    });
  };

  return (
    <div>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Button variant="subtle" size="xs" compact>
            Update
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack>
            <Text size="sm">Do this only when you are really sure</Text>
            <div>
              <Group position="right">
                <Button
                  variant="subtle"
                  size="xs"
                  compact
                  loading={loadingUpdateIntegration}
                  onClick={() => updateIntegrationDefinition(id)}
                >
                  Update
                </Button>
              </Group>
            </div>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function Integrations() {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const [addNewIntegrationState, setAddNewIntegrationState] =
    React.useState(false);

  const {
    data: integrationDefinitions,
    isLoading,
    refetch,
  } = useGetIntegrationDefinitionsQuery({
    workspaceId: workspaceId as string,
  });

  const columns = [
    {
      name: 'Name',
      key: 'name',
      render: (data: IntegrationDefinition) => {
        return (
          <div className={styles.tableDataContainer}>
            <div className={styles.integrationName}>
              <IntegrationIcon icon={data.icon} width={25} height={25} />
              <Text>{data.name}</Text>
            </div>
          </div>
        );
      },
    },
    {
      name: 'Category',
      key: 'category',
      render: (data: IntegrationDefinition) => {
        return (
          <div className={styles.tableDataContainer}>
            <IntegrationType type={data.integrationType as any} />
          </div>
        );
      },
    },
    {
      name: 'Stage',
      key: 'stage',
      render: (data: IntegrationDefinition) => {
        return (
          <div className={styles.tableDataContainer}>
            <ReleaseStage type={data.releaseStage as any} />
          </div>
        );
      },
    },
    {
      name: 'Source URL',
      key: 'source',
      render: (data: IntegrationDefinition) => {
        return (
          <div className={styles.tableDataContainer}>
            <UnstyledButton
              onClick={() => {
                window.open(
                  data.sourceUrl,
                  '_blank', // <- This is what makes it open in a new window.
                );
              }}
            >
              <Text td="underline" fz="sm">
                Source Link
              </Text>
            </UnstyledButton>
          </div>
        );
      },
    },
    {
      name: 'Version',
      key: 'version',
      render: (data: IntegrationDefinition) => {
        return <div className={styles.tableDataContainer}>v{data.version}</div>;
      },
    },
    {
      name: 'Latest version',
      key: 'latest_version',
      render: (data: IntegrationDefinition) => {
        return (
          <div className={styles.tableDataContainer}>
            <Stack align="center" spacing="xs">
              <div>v{data.latestVersion}</div>
              {!data.isLatest && (
                <UpdateComponent id={data} refetch={refetch} />
              )}
            </Stack>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.tableContainer}>
      <Group position="right" mb="md">
        <Button onClick={() => setAddNewIntegrationState(true)}>
          + Add Integration
        </Button>
      </Group>
      <Paper radius="md" className={styles.tablePaper}>
        <Table
          horizontalSpacing="lg"
          columns={columns}
          idKey="integrationAccountId"
          onRowClick={(id: string) => console.log(id)}
          data={integrationDefinitions}
        />
      </Paper>
      {addNewIntegrationState && (
        <AddNewIntegrationModal
          opened={addNewIntegrationState}
          onClose={() => {
            refetch();
            setAddNewIntegrationState(false);
          }}
        />
      )}
    </div>
  );
}
