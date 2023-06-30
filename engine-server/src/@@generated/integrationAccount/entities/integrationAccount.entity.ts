import { Prisma } from '@prisma/client';
import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationConnectLink } from '../../integrationConnectLink/entities/integrationConnectLink.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class IntegrationAccount {
  integrationAccountId: string;
  integrationDefinition?: IntegrationDefinition;
  integrationDefinitionId: string;
  integrationConfiguration: Prisma.JsonValue | null;
  authType: string;

  @ApiHideProperty()
  workspace?: Workspace;

  workspaceId: string;
  integrationAccountName: string;
  deleted: Date | null;
  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  fromLinks?: IntegrationConnectLink | null;

  integrationConnectLinkIntegrationConnectionLinkId: string | null;
}
