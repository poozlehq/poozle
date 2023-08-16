/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class TagQueryParams extends QueryParams {}

export class CommonTagQueryParams extends JustRawParams {}

export class Tag {
  id: string;
  name: string;
  description: string;
  color: string;
}

export class TicketingTagsResponse {
  data: Tag[];
  meta: Meta;
}

export class TicketingTagResponse {
  data: Tag;
}

export class PathParams {}

export class PathParamsWithTagId {
  @IsString()
  tag_name: string;
}

export class UpdateTagBody {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  color: string;
}

export class CreateTagBody {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  color: string;
}
