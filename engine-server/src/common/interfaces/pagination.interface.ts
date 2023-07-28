/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationParams {
  @ApiProperty({
    name: 'cursor',
    type: 'string',
    description:
      'Cursor to start from. You can find cursors for next & previous pages in the meta.cursors property of the response.',
  })
  @IsString()
  @IsOptional()
  cursor?: string;

  @ApiProperty({
    name: 'limit',
    type: 'number',
    description:
      'Number of results to return. Minimum 1, Maximum 200, Default 10',
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit = 10;
}
