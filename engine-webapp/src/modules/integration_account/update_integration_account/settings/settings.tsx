/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import { Stack } from '@mantine/core';
import { isSyncEnabled } from 'utils/sync';

import { DeleteIntegrationAccount } from '../delete_integration_account';
import { SyncSettings } from '../sync_settings';

interface SettingsProps {
  integrationAccount: IntegrationAccount;
  refetch: () => void;
}

export function Settings({ integrationAccount, refetch }: SettingsProps) {
  return (
    <Stack spacing="lg">
      {isSyncEnabled(
        integrationAccount.integrationDefinition.integrationType,
      ) && (
        <SyncSettings
          integrationAccount={integrationAccount}
          refetch={refetch}
        />
      )}
      <DeleteIntegrationAccount integrationAccount={integrationAccount} />
    </Stack>
  );
}
