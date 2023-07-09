/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginationParams } from './pagination.interface';

export class QueryParams extends PaginationParams {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  raw?: boolean;
}

export class JustRawParams {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  raw?: boolean;
}

export enum DIRECTION_ENUM {
  'asc' = 'asc',
  'desc' = 'desc',
}
