import { User } from '../../user/entities/user.entity';
import { IntegrationDefinition } from '../../integrationDefinition/entities/integrationDefinition.entity';
import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';
import { IntegrationOAuthApp } from '../../integrationOAuthApp/entities/integrationOAuthApp.entity';
import { IntegrationConnectLink } from '../../integrationConnectLink/entities/integrationConnectLink.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class Workspace {
  workspaceId: string;
  slug: string;

  @ApiHideProperty()
  user?: User;

  userId: string;
  initialSetupComplete: boolean;
  anonymousDataCollection: boolean;

  @ApiHideProperty()
  IntegrationDefinition?: IntegrationDefinition[];

  @ApiHideProperty()
  IntegrationAccount?: IntegrationAccount[];

  @ApiHideProperty()
  IntegrationOAuthApp?: IntegrationOAuthApp[];

  deleted: Date | null;

  @ApiHideProperty()
  IntegrationConnectLink?: IntegrationConnectLink[];
}
