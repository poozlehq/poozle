/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationParams } from './pagination.interface';

export class SortObject {
  @IsString()
  by: string;
}

export class QueryParams extends PaginationParams {
  @IsOptional()
  @IsObject()
  sort?: SortObject;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === 'True')
  raw?: boolean;

  @IsObject()
  @IsOptional()
  filter?: Record<string, string>;
}

export class JustRawParams {
  @IsBoolean()
  @IsOptional()
  raw?: boolean;
}
