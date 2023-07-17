import { Prisma } from '@prisma/client';
import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';
import { Link } from '../../link/entities/link.entity';

export class IntegrationAccount {
  /**
   * A unique identifier for Integration Account
   */
  integrationAccountId: string;

  /**
   * Integration Definition
   */
  integrationDefinition?: IntegrationDefinition;

  /**
   * A unique identifier for Integration Definition
   */
  integrationDefinitionId: string;

  /**
   * Configuration used to configure the integration
   */
  integrationConfiguration: Prisma.JsonValue | null;

  /**
   * Type of authentication used to create this account
   * Exmaple: OAuth2, Api Key etc
   */
  authType: string;

  /**
   * A unique identifier for Workspace
   */
  workspaceId: string;

  /**
   * This is used for User experience. You can pass a name
   * to easily identify the account in UI
   */
  integrationAccountName: string;

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

  /**
   * Link used to create this account
   */
  fromLinks?: Link | null;

  /**
   * This will be linkId of the link used to created this account
   */
  linkId?: string | null;
}
