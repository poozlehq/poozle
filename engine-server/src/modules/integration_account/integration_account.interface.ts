/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-edk';
import { IntegrationType } from '@prisma/client';

export interface IntegrationAccountRequestBody {
  integrationAccountName: string;
  workspaceId: string;
}

export interface IntegrationAccountRequestBodyWithIntegrationType
  extends IntegrationAccountRequestBody {
  integrationType: IntegrationType;
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
