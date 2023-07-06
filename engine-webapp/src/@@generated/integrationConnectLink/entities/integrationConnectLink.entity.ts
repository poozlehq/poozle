import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';
import { IntegrationType } from 'lib/integration_type';

export class IntegrationConnectLink {
  integrationConnectionLinkId: string;
  expiresIn: number;
  category: IntegrationType[];
  workspace?: Workspace;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  IntegrationAccount?: IntegrationAccount[];
}
