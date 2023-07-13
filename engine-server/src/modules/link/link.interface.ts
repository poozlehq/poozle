/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Link } from '@@generated/link/entities';

export class CreateLinkBody {
  @IsArray()
  category: IntegrationType[];

  @IsString()
  @IsOptional()
  integrationDefinitionId?: string;

  @IsNumber()
  expiresIn: number;

  @IsString()
  workspaceId: string;

  @IsString()
  linkName: string;
}

export class GetLinkRequest {
  @IsString()
  linkId: string;
}

export class WorkspaceIdQueryRequest {
  @IsString()
  workspaceId: string;
}

export class LinkIdentifierQueryParams {
  @IsString()
  @IsOptional()
  accountIdentifier: string;
}

export class LinkIdRequest {
  @IsString()
  linkId: string;
}

export class IntegrationAccount {
  integrationAccountId: string;
  integrationDefinitionId: string;
}

export class LinkResponse extends Link {
  expired: boolean;

  integrationAccounts?: IntegrationAccount[];
  integrationDefinitions?: IntegrationDefinition[];
}
