/** Copyright (c) 2023, Poozle, all rights reserved. **/

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
  raw?: boolean;

  @IsObject()
  @IsOptional()
  filter?: Record<string, string>;
}
