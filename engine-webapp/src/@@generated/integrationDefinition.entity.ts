import { Workspace } from './workspace.entity';
import { IntegrationAccount } from './integrationAccount.entity';
import { IntegrationOAuthApp } from './integrationOAuthApp.entity';

const enum IntegrationType {
  MESSAGING = 'MESSAGING',
  HRIS = 'HRIS',
  CALENDAR = 'CALENDAR',
  TICKETING = 'TICKETING',
}

const enum ReleaseStage {
  ALPHA = 'ALPHA',
  BETA = 'BETA',
  GENERALLY_AVAILABLE = 'GENERALLY_AVAILABLE',
  CUSTOM = 'CUSTOM',
}

export class IntegrationDefinition {
  integrationDefinitionId: string;
  name: string;
  key: string;
  icon: string | null;
  releaseStage: ReleaseStage;
  sourceUrl: string;
  integrationType: IntegrationType;
  workspace?: Workspace | null;
  workspaceId: string | null;
  IntegrationAccount?: IntegrationAccount[];
  IntegrationOAuthApp?: IntegrationOAuthApp[];
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
