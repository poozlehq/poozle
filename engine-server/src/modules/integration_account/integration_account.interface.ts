/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-idk';
import { IntegrationType } from '@prisma/client';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class IntegrationAccountRequestIdBody {
  /**
   * Id for the integration account
   * @example Kitty
   */
  @IsString()
  integrationAccountId: string;
}

export class IntegrationAccountWithLinkRequestIdBody {
  @IsString()
  linkId: string;
}

export class IntegrationAccountRequestBody {
  @IsString()
  integrationAccountId: string;

  @IsString()
  workspaceId: string;
}

export class IntegrationAccountsRequestBody {
  /**
   * Workspace ID of the integration accounts you want to fetch
   * @example 0a58f56e-3f59-4f4e-a8e1-a9e47aae5c3c
   */
  @IsString()
  workspaceId: string;
}

export interface IntegrationAccountRequestBodyWithIntegrationType
  extends IntegrationAccountRequestBody {
  integrationType: IntegrationType;
}

export class IntegrationCheckBody {
  @IsString()
  integrationDefinitionId: string;

  config: Config;

  @IsString()
  authType: string;

  @IsString()
  workspaceId: string;
}

export class CreateIntegrationAccountBody {
  @IsString()
  integrationDefinitionId: string;

  @IsString()
  integrationAccountName: string;

  @IsString()
  authType: string;

  @IsString()
  workspaceId: string;

  @IsObject()
  config: Config;

  @IsString()
  @IsOptional()
  accountIdentifier: string;
}

export class CreateIntegrationAccountWithLinkBody {
  @IsString()
  integrationDefinitionId: string;

  @IsString()
  integrationAccountName: string;

  @IsString()
  authType: string;

  @IsString()
  @IsOptional()
  accountIdentifier: string;

  @IsObject()
  config: Config;
}

export class UpdateIntegrationAccountBody {
  @IsString()
  integrationAccountName: string;

  @IsString()
  authType: string;

  @IsObject()
  config: Config;
}
