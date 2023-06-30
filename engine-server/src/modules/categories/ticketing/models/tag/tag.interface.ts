/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

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

export class PathParams {
  @IsString()
  collection_id: string;
}

export class PathParamsWithTagId {
  @IsString()
  tag_id: string;

  @IsString()
  collection_id: string;
}

export class UpdateTagBody {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;
}

export class CreateTagBody {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;
}
