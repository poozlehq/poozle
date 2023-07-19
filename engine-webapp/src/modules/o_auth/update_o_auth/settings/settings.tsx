/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { DeleteOAuthApp } from '../delete_o_auth';

interface SettingsProps {
  integrationOAuthAppId: string;
}

export function Settings({ integrationOAuthAppId }: SettingsProps) {
  return <DeleteOAuthApp integrationOAuthAppId={integrationOAuthAppId} />;
}
