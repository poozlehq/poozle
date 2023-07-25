/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationParams } from './pagination.interface';

export class QueryParams extends PaginationParams {
  /**
   * Get all resources created after
   */
  @IsOptional()
  @IsString()
  created_after?: string;

  /**
   * Get all resources created before
   */
  @IsOptional()
  @IsString()
  created_before?: string;

  /**
   * Get all resources updated after
   */
  @IsOptional()
  @IsString()
  updated_after?: string;

  /**
   * Get all resources updated before
   */
  @IsOptional()
  @IsString()
  updated_before?: string;

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
