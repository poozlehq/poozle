/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginationParams } from './pagination.interface';

export class QueryParams extends PaginationParams {
  @ApiProperty({
    name: 'raw',
    type: 'boolean',
    description:
      'Include raw response. When you want more data from the source',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  raw?: boolean;
}

export class JustRawParams {
  @ApiProperty({
    name: 'raw',
    type: 'boolean',
    description:
      'Include raw response. When you want more data from the source',
  })
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
