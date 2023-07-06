
import {User} from '../../user/entities/user.entity'
import {IntegrationDefinition} from '../../integrationDefinition/entities/integrationDefinition.entity'
import {IntegrationAccount} from '../../integrationAccount/entities/integrationAccount.entity'
import {IntegrationOAuthApp} from '../../integrationOAuthApp/entities/integrationOAuthApp.entity'
import {Link} from '../../link/entities/link.entity'


export class Workspace {
  workspaceId: string ;
slug: string ;
user?: User ;
userId: string ;
initialSetupComplete: boolean ;
anonymousDataCollection: boolean ;
IntegrationDefinition?: IntegrationDefinition[] ;
IntegrationAccount?: IntegrationAccount[] ;
IntegrationOAuthApp?: IntegrationOAuthApp[] ;
deleted: Date  | null;
Link?: Link[] ;
}
