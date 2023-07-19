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

import { useDeleteIntegrationOAuthAppMutation } from 'services/integration_oauth/delete_integration_oauth_app';

import styles from './delete_o_auth.module.scss';

interface DeleteOAuthAppProps {
  integrationOAuthAppId: string;
}

export function DeleteOAuthApp({ integrationOAuthAppId }: DeleteOAuthAppProps) {
  const router = useRouter();

  const { mutate: deleteOAuthApp, isLoading: deletingOAuthApp } =
    useDeleteIntegrationOAuthAppMutation({
      onSuccess: () => {
        router.back();
      },
    });

  return (
    <Paper className={styles.container}>
      <Stack align="left" spacing="xs">
        <Title p="md" order={5} className={styles.title}>
          Delete OAuth app
        </Title>
        <Text p="md" size="sm" color="gray">
          You cannot restore the OAuth app.
        </Text>

        <Group position="right" pb="md" pr="md">
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button color="red" loading={deletingOAuthApp}>
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
                        deleteOAuthApp({
                          integrationOAuthAppId,
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
