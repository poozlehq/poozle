import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';

export class IntegrationOAuthApp {
  integrationOAuthAppId: string;
  integrationOAuthAppName: string;
  integrationDefinition?: IntegrationDefinition;
  integrationDefinitionId: string;
  clientId: string;
  clientSecret: string;
  scopes: string;
  workspaceId: string;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
