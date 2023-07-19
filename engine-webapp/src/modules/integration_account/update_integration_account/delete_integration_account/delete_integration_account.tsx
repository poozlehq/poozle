/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Paper,
  Stack,
  Title,
  Text,
  Popover,
  Button,
  Group,
} from '@mantine/core';
import { useRouter } from 'next/router';

import { useDeleteIntegrationAccount } from 'services/integration_account';

import styles from './delete_integration_account.module.scss';

interface DeleteIntegrationAccountProps {
  integrationAccountId: string;
}

export function DeleteIntegrationAccount({
  integrationAccountId,
}: DeleteIntegrationAccountProps) {
  const router = useRouter();

  const {
    mutate: deleteIntegrationAccount,
    isLoading: deletingIntegrationAccount,
  } = useDeleteIntegrationAccount({
    onSuccess: () => {
      router.back();
    },
  });

  return (
    <Paper className={styles.container}>
      <Stack align="left" spacing="xs">
        <Title p="md" order={5} className={styles.title}>
          Delete Integration Account
        </Title>
        <Text p="md" size="sm" color="gray">
          You cannot restore the integration account.
        </Text>

        <Group position="right" pb="md" pr="md">
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button color="red" loading={deletingIntegrationAccount}>
                Delete
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Text size="sm">Do this only when you are really sure</Text>
                <div>
                  <Group position="right">
                    <Button
                      variant="subtle"
                      color="red"
                      size="xs"
                      onClick={() =>
                        deleteIntegrationAccount({
                          integrationAccountId,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </Group>
                </div>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Stack>
    </Paper>
  );
}
