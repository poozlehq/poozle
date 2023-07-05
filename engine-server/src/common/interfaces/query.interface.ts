/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginationParams } from './pagination.interface';

export class QueryParams extends PaginationParams {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === 'True')
  raw?: boolean;
}

export class JustRawParams {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === 'True')
  raw?: boolean;
}

export enum DIRECTION_ENUM {
  'asc' = 'asc',
  'desc' = 'desc',
}
