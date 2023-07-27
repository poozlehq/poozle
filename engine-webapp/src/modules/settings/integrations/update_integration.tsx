/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Button, Group, Popover, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertSmall, IconCheck } from '@tabler/icons-react';

import { useUpdateIntegrationDefinitionMutation } from 'services/integration_definition';

interface UpdateComponentInterface {
  id: IntegrationDefinition;
  refetch: () => void;
}

export function UpdateComponent({ id, refetch }: UpdateComponentInterface) {
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
