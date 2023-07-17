import { ReleaseStage, IntegrationType } from '@prisma/client';

export class IntegrationDefinition {
  /**
   * A unique identifier for Integration Definition
   */
  integrationDefinitionId: string;

  /**
   * Name of the integration
   */
  name: string;

  /**
   * A unique identifier in text used to identify Integration
   */
  key: string;

  /**
   * Icon for the integration
   */
  icon: string | null;

  /**
   * Current version of the integration
   */
  version: string;

  /**
   * This tells the status of the integration.
   * If Alpha most features will be working but can expect some issues.
   */
  releaseStage: ReleaseStage;

  /**
   * This is the URL where the compiled source code of integration
   */
  sourceUrl: string;

  /**
   * Category integration belongs to
   * Example: Ticketing, Documentation etc
   */
  integrationType: IntegrationType;

  /**
   * A unique identifier for Workspace
   */
  workspaceId: string | null;

  /**
   * When this account is deleted. If deleted
   */
  deleted: Date | null;

  /**
   * When the integration account was created.
   */
  createdAt: Date;

  /**
   * When the integration account was updated last.
   */
  updatedAt: Date;
}
