/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { Button, Group, Paper, Select, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { SYNC_OPTIONS, SYNC_OPTION_ENUM } from 'utils/sync';

import { useUpdateIntegrationAccountMutation } from 'services/integration_account';

import styles from './sync_settings.module.scss';

interface SyncSettingstProps {
  integrationAccount: IntegrationAccount;
  refetch: () => void;
}

export function SyncSettings({
  integrationAccount,
  refetch,
}: SyncSettingstProps) {
  const { mutate: updateIntegrationAccount, isLoading: updateIsLoading } =
    useUpdateIntegrationAccountMutation({
      onSuccess: (data) => {
        refetch();
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `Integration account ${data.integrationAccountName} is updated`,
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const form = useForm({
    initialValues: {
      syncEnabled: integrationAccount.syncEnabled ? 'Yes' : 'No',
      syncPeriod: integrationAccount.syncPeriod
        ? integrationAccount.syncPeriod
        : undefined,
    },
  });

  return (
    <Paper className={styles.container}>
      <Stack align="left" spacing="xs">
        <Title p="md" order={5} className={styles.title}>
          Sync Settings
        </Title>
      </Stack>

      <Group p="lg" className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={form.onSubmit((values) => {
            updateIntegrationAccount({
              config: integrationAccount.integrationConfiguration,
              authType: integrationAccount.authType,
              integrationAccountName: integrationAccount.integrationAccountName,
              integrationAccountId: integrationAccount.integrationAccountId,
              syncEnabled: values.syncEnabled === 'Yes' ? true : false,
              syncPeriod: values.syncPeriod as SYNC_OPTION_ENUM,
            });
          })}
        >
          <Select
            pb="md"
            label="Sync Enabled"
            disabled={updateIsLoading}
            placeholder="Choose if sync needs to be enabled"
            data={['Yes', 'No']}
            {...form.getInputProps('syncEnabled')}
          />
          {form.values.syncEnabled === 'Yes' && (
            <Select
              pb="md"
              label="Sync Period"
              disabled={updateIsLoading}
              data={Object.keys(SYNC_OPTIONS).map(
                (option: SYNC_OPTION_ENUM) => ({
                  label: SYNC_OPTIONS[option],
                  value: option,
                }),
              )}
              placeholder="Choose sync period"
              {...form.getInputProps('syncPeriod')}
            />
          )}

          <Group pt="xl" position="right">
            <Button type="submit" loading={updateIsLoading}>
              Update
            </Button>
          </Group>
        </form>
      </Group>
    </Paper>
  );
}
