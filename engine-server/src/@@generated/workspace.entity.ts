
import {User} from './user.entity'
import {IntegrationDefinition} from './integrationDefinition.entity'
import {IntegrationAccount} from './integrationAccount.entity'
import {IntegrationOAuthApp} from './integrationOAuthApp.entity'


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
}
