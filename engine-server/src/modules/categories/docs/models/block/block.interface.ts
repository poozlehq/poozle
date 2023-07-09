/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';

export class ListBlocksQueryParams extends QueryParams {
  @IsOptional()
  @IsString()
  cursor?: string;
}

export class CommonBlockQueryParams extends JustRawParams {}

export class PathParamsWithBlockId {
  @IsString()
  block_id: string;
}

export interface Content {
  annotations: {
    bold: string;
    italic: string;
    strikethrough: string;
    underline: string;
    code: string;
    color: string;
  };
  plain_text: string;
  href: string;
}

export interface Block {
  id: string;
  parent_id: string;
  block_type: string;
  content: Content[];
  children: Block[];
}

export class BlocksResponse {
  data: Block | Block[];
}

export class Annotations {
  @IsOptional()
  @IsString()
  bold: string;

  @IsOptional()
  @IsString()
  italic: string;

  @IsOptional()
  @IsString()
  strikethrough: string;

  @IsOptional()
  @IsString()
  underline: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  color: string;
}

export class Content {
  @IsOptional()
  annotations: Annotations;

  @IsOptional()
  @IsString()
  plain_text: string;

  @IsOptional()
  @IsString()
  href: string;
}

export class UpdatePageBody {
  @IsString()
  block_type: string;

  content: Content[];
}

export class CreatePageBody {
  data: UpdatePageBody[];
}
