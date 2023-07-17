import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';

export class IntegrationOAuthApp {
  /**
   * A unique identifier for Integration OAuth app
   */
  integrationOAuthAppId: string;

  /**
   * Name for integration Oauth apps
   */
  integrationOAuthAppName: string;

  /**
   * Integration Definitions
   */
  integrationDefinition?: IntegrationDefinition;

  /**
   * A unique identifier for Integration Definition
   */
  integrationDefinitionId: string;

  /**
   * Client Id for the OAuth to configure
   */
  clientId: string;

  /**
   * Client secret for the OAuth to configure
   */
  clientSecret: string;

  /**
   * Scopes needed for this oAuth app
   */
  scopes: string;

  /**
   * A unique identifier for Workspace
   */
  workspaceId: string;

  /**
   * When this integration OAuth App is deleted. If deleted
   */
  deleted: Date | null;

  /**
   * When the integration OAuth App was created.
   */
  createdAt: Date;

  /**
   * When the integration OAuth App was updated last.
   */
  updatedAt: Date;
}
