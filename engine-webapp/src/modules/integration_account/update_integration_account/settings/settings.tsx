/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { DeleteIntegrationAccount } from '../delete_integration_account';

interface SettingsProps {
  integrationAccountId: string;
}

export function Settings({ integrationAccountId }: SettingsProps) {
  return (
    <DeleteIntegrationAccount integrationAccountId={integrationAccountId} />
  );
}
