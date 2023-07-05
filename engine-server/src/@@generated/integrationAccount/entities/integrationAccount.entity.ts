
import {Prisma} from '@prisma/client'
import {IntegrationDefinition} from '../../integrationDefinition/entities/integrationDefinition.entity'
import {Workspace} from '../../workspace/entities/workspace.entity'
import {Link} from '../../link/entities/link.entity'


export class IntegrationAccount {
  integrationAccountId: string ;
integrationDefinition?: IntegrationDefinition ;
integrationDefinitionId: string ;
integrationConfiguration: Prisma.JsonValue  | null;
authType: string ;
workspace?: Workspace ;
workspaceId: string ;
integrationAccountName: string ;
deleted: Date  | null;
createdAt: Date ;
updatedAt: Date ;
fromLinks?: Link  | null;
linkId: string  | null;
}
