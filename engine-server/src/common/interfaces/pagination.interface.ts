/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationParams {
  @IsString()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
