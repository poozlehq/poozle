
import {IntegrationDefinition} from './integrationDefinition.entity'
import {Workspace} from './workspace.entity'


export class IntegrationOAuthApp {
  integrationOAuthAppId: string ;
integrationOAuthAppName: string ;
integrationDefinition?: IntegrationDefinition ;
integrationDefinitionId: string ;
clientId: string ;
clientSecret: string ;
scopes: string ;
workspace?: Workspace  | null;
workspaceId: string  | null;
deleted: Date  | null;
createdAt: Date ;
updatedAt: Date ;
}
