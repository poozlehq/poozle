import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';

export class Link {
  /**
   * A unique identifier for Link
   */
  linkId: string;

  /**
   * Name of the link. Majorly used to easily search for this in UI
   * Example: You can use customer name: Poozle
   */
  linkName: string;

  /**
   * Boolean to tell if the link can expire
   */
  canExpire: boolean;

  /**
   * Boolean to tell if only OAuth should be accepted
   * as authentication process
   */
  preferOAuth: boolean;

  /**
   * If canExpire is set to true. This indicates
   * seconds in which the link will expire.
   */
  expiresIn: number;

  /**
   * Category integration belongs to
   * Example: Ticketing, Documentation etc
   */
  category: IntegrationType[];

  /**
   * Unique identifier for Workspace.
   */
  workspaceId: string;

  /**
   * When the Link was created.
   */
  createdAt: Date;

  /**
   * When the Link was updated last.
   */
  updatedAt: Date;

  /**
   * Integration Accounts
   */
  IntegrationAccount?: IntegrationAccount[];
}
