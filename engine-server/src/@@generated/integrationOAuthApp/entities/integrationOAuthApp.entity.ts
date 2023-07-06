
import {IntegrationDefinition} from '../../integrationDefinition/entities/integrationDefinition.entity'
import {Workspace} from '../../workspace/entities/workspace.entity'


export class IntegrationOAuthApp {
  integrationOAuthAppId: string ;
integrationOAuthAppName: string ;
integrationDefinition?: IntegrationDefinition ;
integrationDefinitionId: string ;
clientId: string ;
clientSecret: string ;
scopes: string ;
workspace?: Workspace ;
workspaceId: string ;
deleted: Date  | null;
createdAt: Date ;
updatedAt: Date ;
}
