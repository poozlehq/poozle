/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Config } from '@poozle/engine-edk';
import { IntegrationType } from '@prisma/client';
import { IsObject, IsString } from 'class-validator';

export class IntegrationAccountRequestIdBody {
  @IsString()
  integrationAccountId: string;
}

export class IntegrationAccountRequestBody {
  @IsString()
  integrationAccountName: string;

  @IsString()
  workspaceId: string;
}

export class IntegrationAccountsRequestBody {
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
}

export class UpdateIntegrationAccountBody {
  @IsString()
  integrationAccountName: string;

  @IsString()
  authType: string;

  @IsObject()
  config: Config;
}
