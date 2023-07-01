import { IntegrationType } from '@prisma/client';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class IntegrationConnectLink {
  integrationConnectionLinkId: string;
  expiresIn: number;
  category: IntegrationType[];

  @ApiHideProperty()
  workspace?: Workspace;

  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  IntegrationAccount?: IntegrationAccount[];
}
