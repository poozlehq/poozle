import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationConnectLink } from '../../integrationConnectLink/entities/integrationConnectLink.entity';

export class IntegrationAccount {
  integrationAccountId: string;
  integrationDefinition?: IntegrationDefinition;
  integrationDefinitionId: string;
  integrationConfiguration: any | null;
  authType: string;
  workspace?: Workspace;
  workspaceId: string;
  integrationAccountName: string;
  /**
   * This is used to map organisations/user_id fo the customers
   */
  accountIdentifier?: string;

  /**
   * Boolean to check if syncing is enabled
   */
  syncEnabled: boolean;

  /**
   * Internal for sync
   */
  syncPeriod?: string;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
  fromLinks?: IntegrationConnectLink | null;
  integrationConnectLinkIntegrationConnectionLinkId: string | null;
}
