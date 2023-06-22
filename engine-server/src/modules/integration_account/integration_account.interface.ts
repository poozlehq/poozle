/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-edk';

export interface IntegrationAccountRequestBody {
  integrationAccountName: string;
  workspaceId: string;
}

export interface IntegrationCheckBody {
  integrationDefinitionId: string;
  config: Config;
  authType: string;
}

export interface CreateIntegrationAccountBody {
  integrationDefinitionId: string;
  integrationAccountName: string;
  authType: string;
  workspaceId: string;
  config: Config;
}
