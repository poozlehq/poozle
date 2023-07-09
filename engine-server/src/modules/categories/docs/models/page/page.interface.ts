/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ListPagesQueryParams extends QueryParams {
  @IsOptional()
  @IsString()
  title?: string[];

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  direction?: string;
}

export class CommonPageQueryParams extends JustRawParams {}

export class PathParamsWithPageId {
  @IsString()
  page_id: string;
}

export class Page {
  id: string;
  parent_id: string;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

export class PageResponse {
  data: Page;
}
export class PagesResponse {
  data: Page[];
  meta: Meta;
}

export class CreatePageBody {
  @IsString()
  parent_id: string;

  @IsString()
  title: string;
}
