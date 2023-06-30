import { ApiHideProperty } from '@nestjs/swagger';
import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

export class IntegrationOAuthApp {
  integrationOAuthAppId: string;
  integrationOAuthAppName: string;

  integrationDefinition?: IntegrationDefinition;
  integrationDefinitionId: string;
  clientId: string;
  clientSecret: string;
  scopes: string;

  @ApiHideProperty()
  workspace?: Workspace | null;

  workspaceId: string | null;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
