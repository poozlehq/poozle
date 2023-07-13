import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Workspace } from '../../workspace/entities/workspace.entity';

import { IntegrationType } from 'lib/integration_type';

export class IntegrationAccount {
  integrationAccountId: string;
  integrationDefinitionId: string;
}

export class Link {
  linkId: string;
  linkName: string;

  canExpire: boolean;
  preferOAuth: boolean;
  expiresIn: number;
  category: IntegrationType[];
  workspace?: Workspace;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  integrationAccounts: IntegrationAccount[];

  integrationDefinitions: IntegrationDefinition[];
  expired: boolean;
}
