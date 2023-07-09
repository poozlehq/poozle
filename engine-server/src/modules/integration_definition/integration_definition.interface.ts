/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Specification } from '@poozle/engine-idk';
import { IntegrationType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

export class IntegrationDefinitionRequestWorkspaceIdBody {
  @IsString()
  workspaceId: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => (value ? value.split(',') : []))
  category?: string[];
}

export class IntegrationDefinitionRequestIdBody {
  @IsString()
  integrationDefinitionId: string;
}

export class IntegrationDefinitionSpec {
  spec: Specification;
}

export class IntegrationDefinitionCreateBody {
  @IsString()
  name: string;

  @IsString()
  sourceUrl: string;

  integrationType: IntegrationType;

  @IsString()
  workspaceId: string;
}

export class IntegrationDefinitionUpdateBody {
  @IsString()
  sourceUrl: string;

  @IsString()
  version: string;
}

export class IntegrationDefinitionResponse extends IntegrationDefinition {
  isLatest: boolean;
  latestVersion: string;
  latestVersionSource: string;
}
