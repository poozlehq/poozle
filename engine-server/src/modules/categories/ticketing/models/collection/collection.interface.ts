/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class CollectionQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class GetCollectionQueryParams extends JustRawParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class Collection {
  id: string;
  parent_id: string;
  type: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;

  integration_account_id?: string;
}

export const COLLECTION_KEYS = [
  'id',
  'parent_id',
  'type',
  'name',
  'description',
  'updated_at',
  'created_at',
];

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
