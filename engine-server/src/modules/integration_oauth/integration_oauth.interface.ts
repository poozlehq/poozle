/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

export class IntegrationOAuthRequestIdBody {
  @IsString()
  integrationOAuthAppId: string;
}

export class IntegrationOAuthRequestWorkspaceIdBody {
  @IsString()
  workspaceId: string;
}

export class IntegrationOAuthCreateBody {
  @IsString()
  workspaceId?: string;

  @IsString()
  integrationDefinitionId: string;

  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  @IsOptional()
  scopes: string;

  @IsString()
  integrationOAuthAppName: string;
}

export class IntegrationOAuthRequestUpdateBody {
  @IsString()
  clientId: string;

  @IsString()
  clientSecret: string;

  @IsString()
  scopes: string;

  @IsString()
  integrationOAuthAppName: string;
}

export class IntegrationOAuthAppsFlat {
  @IsString()
  integrationDefinitionId: string;

  @IsString()
  integrationOAuthAppId: string;
}
