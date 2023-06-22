
import {ReleaseStage,IntegrationType} from '@prisma/client'
import {Workspace} from './workspace.entity'
import {IntegrationAccount} from './integrationAccount.entity'
import {IntegrationOAuthApp} from './integrationOAuthApp.entity'


export class IntegrationDefinition {
  integrationDefinitionId: string ;
name: string ;
key: string ;
icon: string  | null;
releaseStage: ReleaseStage ;
sourceUrl: string ;
integrationType: IntegrationType ;
workspace?: Workspace  | null;
workspaceId: string  | null;
IntegrationAccount?: IntegrationAccount[] ;
IntegrationOAuthApp?: IntegrationOAuthApp[] ;
deleted: Date  | null;
createdAt: Date ;
updatedAt: Date ;
}
