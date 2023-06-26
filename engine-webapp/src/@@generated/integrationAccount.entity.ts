import { IntegrationDefinition } from './integrationDefinition.entity';
import { Workspace } from './workspace.entity';

export class IntegrationAccount {
  integrationAccountId: string;
  integrationDefinition?: IntegrationDefinition;
  integrationDefinitionId: string;
  integrationConfiguration: Record<string, any> | null;
  authType: string;
  workspace?: Workspace;
  workspaceId: string;
  integrationAccountName: string;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
