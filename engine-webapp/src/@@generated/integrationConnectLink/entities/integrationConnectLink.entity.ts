import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';

const enum IntegrationType {
  HRIS = 'HRIS',
  MESSAGING = 'MESSAGING',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
  EMAIL = 'EMAIL',
}

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
