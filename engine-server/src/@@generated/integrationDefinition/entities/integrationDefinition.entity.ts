import { ReleaseStage, IntegrationType } from '@prisma/client';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';
import { IntegrationOAuthApp } from '../../integrationOAuthApp/entities/integrationOAuthApp.entity';

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
}
