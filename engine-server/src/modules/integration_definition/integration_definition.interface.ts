/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Specification } from '@poozle/engine-idk';
import { IntegrationType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';

import { WorkspaceIdRequestBody } from 'common/interfaces/workspace.interface';

export class IntegrationDefinitionRequestWorkspaceIdBody extends WorkspaceIdRequestBody {
  /**
   * Category integration belongs to
   * Example: Ticketing, Documentation etc
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => (value ? value.split(',') : []))
  category?: string[];
}

export class IntegrationDefinitionRequestIdBody {
  /**
   * A unique identifier for Integration Definition
   */
  @IsString()
  integrationDefinitionId: string;
}

export class IntegrationDefinitionSpec {
  /**
   * Spec from the integration.
   * This has information on how you can access
   *  the integration definition APIs
   */
  spec: Specification;
}

export class IntegrationDefinitionCreateBody extends WorkspaceIdRequestBody {
  /**
   * Name of the integration
   */
  @IsString()
  name: string;

  /**
   * This is the URL where the compiled source code of integration
   */
  @IsString()
  sourceUrl: string;

  /**
   * Category integration belongs to
   * Example: Ticketing, Documentation etc
   */
  integrationType: IntegrationType;
}

export class IntegrationDefinitionUpdateBody {
  /**
   * This is the URL where the compiled source code of integration
   */
  @IsString()
  sourceUrl: string;

  /**
   * Current version of the integration
   */
  @IsString()
  version: string;
}

export class IntegrationDefinitionResponse extends IntegrationDefinition {
  /**
   * Boolean to validate if the integration is on latest version
   */
  isLatest: boolean;

  /**
   * Current latest version for the integration
   */
  latestVersion: string;

  /**
   * Link to the source code for the latest version
   */
  latestVersionSource: string;
}
