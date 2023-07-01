/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  DIRECTION_ENUM,
  JustRawParams,
  QueryParams,
} from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

enum SORT_ENUM {
  'name' = 'name',
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}

export class CollectionQueryParams extends QueryParams {
  @IsOptional()
  @IsEnum(SORT_ENUM)
  sort?: string;

  @IsOptional()
  @IsEnum(DIRECTION_ENUM)
  direction?: string;
}

export class GetCollectionQueryParams extends JustRawParams {}

export class Collection {
  id: string;
  parent_id: string;
  type: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class TicketingCollectionsResponse {
  data: Collection[];
  meta: Meta;
}

export class TicketingCollectionResponse {
  data: Collection;
}

export class PathParamsWithCollectionId {
  @IsString()
  collection_id: string;
}
