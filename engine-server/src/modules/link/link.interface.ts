/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Link } from '@@generated/link/entities';

import { WorkspaceIdRequestBody } from 'common/interfaces/workspace.interface';

export class CreateLinkBody extends WorkspaceIdRequestBody {
  /**
   * Integration categories you want this link to support.
   * Example: Ticketing, Documentation etc
   */
  @IsArray()
  category: IntegrationType[];

  /**
   * Integration definition Id when you want to restrict the link to specific integration
   */
  @IsString()
  @IsOptional()
  integrationDefinitionId?: string;

  /**
   * Link expires after the specified seconds
   */
  @IsNumber()
  expiresIn: number;

  /**
   * Name of the link. Majorly used to easily search for this in UI
   * Example: You can use customer name: Poozle
   */
  @IsString()
  linkName: string;
}

export class GetLinkRequest {
  /**
   * A unique identifier for the Link Object
   */
  @IsString()
  linkId: string;
}

export class WorkspaceIdQueryRequest extends WorkspaceIdRequestBody {}

export class LinkIdentifierQueryParams {
  /**
   * A unique identifier can be passed to identify a group of Accounts.
   * Example: You can pass user_id or random hash.
   */
  @IsString()
  @IsOptional()
  accountIdentifier: string;
}

export class LinkIdRequest extends GetLinkRequest {}

export class IntegrationAccount {
  /**
   * A unique identifier for Integration Account
   */
  integrationAccountId: string;

  /**
   * A unique identifier for Integration Definition
   */
  integrationDefinitionId: string;

  /**
   * Name of the integration
   */
  integrationDefinitionName: string;

  /**
   * A unique identifier in text used to identify Integration
   */
  integrationDefinitionKey: string;
}

export class LinkResponse extends Link {
  /**
   * Tells if the link is expired or not
   */
  expired: boolean;

  integrationAccounts?: IntegrationAccount[];
  integrationDefinitions?: IntegrationDefinition[];
}
