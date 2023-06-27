/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from '@prisma/client';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateIntegrationConnectLinkBody {
  @IsArray()
  category: IntegrationType[];

  @IsNumber()
  expires: number;

  @IsString()
  workspaceId: string;
}

export class GetIntegrationConnectLinkRequest {
  @IsString()
  workspaceId: string;

  @IsString()
  integrationConnectLinkId: string;
}

export class WorkspaceIdQueryRequest {
  @IsString()
  workspaceId: string;
}

export class IntegrationConnectLinkIdRequest {
  @IsString()
  integrationConnectLinkId: string;
}
