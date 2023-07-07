import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';
import { IntegrationOAuthApp } from '../../integrationOAuthApp/entities/integrationOAuthApp.entity';
import { IntegrationType } from 'lib/integration_type';

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
  version: string;
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

  isLatest: boolean;
  latestVersion: string;
  latestVersionSource: string;
}
