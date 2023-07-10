import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '../../integrationAccount/entities/integrationAccount.entity';

export class Link {
  linkId: string;
  linkName: string;
  expiresIn: number;
  category: IntegrationType[];
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  IntegrationAccount?: IntegrationAccount[];
}
