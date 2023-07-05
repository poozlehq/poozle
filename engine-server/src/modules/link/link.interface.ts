/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationType } from '@prisma/client';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { Link } from '@@generated/link/entities';

export class CreateLinkBody {
  @IsArray()
  category: IntegrationType[];

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

export class LinkIdRequest {
  @IsString()
  linkId: string;
}

export class LinkResponse extends Link {
  expired: boolean;
}
