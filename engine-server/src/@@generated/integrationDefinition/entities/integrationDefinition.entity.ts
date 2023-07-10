import { ReleaseStage, IntegrationType } from '@prisma/client';

export class IntegrationDefinition {
  integrationDefinitionId: string;
  name: string;
  key: string;
  icon: string | null;
  version: string;
  releaseStage: ReleaseStage;
  sourceUrl: string;
  integrationType: IntegrationType;
  workspaceId: string | null;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
