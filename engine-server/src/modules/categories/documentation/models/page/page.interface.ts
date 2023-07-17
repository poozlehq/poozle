/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  QueryParams,
  JustRawParams,
  DIRECTION_ENUM,
} from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export enum SORT_ENUM {
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}

export class ListPagesQueryParams extends QueryParams {
  /**
   * Filter by title
   */
  @IsOptional()
  @IsString()
  title?: string[];

  /**
   * The pagination cursor value.
   */
  @IsOptional()
  @IsString()
  cursor?: string;

  /**
   * You can the use values from enum to sort the respose
   */
  @IsOptional()
  @IsString()
  @IsEnum(SORT_ENUM)
  sort?: SORT_ENUM;

  /**
   * You can pass asc/desc
   */
  @IsOptional()
  @IsString()
  @IsEnum(DIRECTION_ENUM)
  direction?: DIRECTION_ENUM;
}

export class CommonPageQueryParams extends JustRawParams {}

export class PathParamsWithPageId {
  /**
   * A unique identifier for the page
   */
  @IsString()
  page_id: string;
}

export class Page {
  /**
   * A unique identifier for the page
   */
  id: string;

  /**
   * Page/Block id of the parent
   */
  parent_id: string;

  /**
   * Title of the page
   */
  title: string;

  /**
   * The account associated with the page
   */
  created_by: string;

  /**
   * Time at which the page is created
   */
  created_at: string;

  /**
   * Last updated time
   */
  updated_at: string;

  /**
   * The account associated with the last update
   */
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
  /**
   * Page id of the block in which new page will be created
   */
  @IsString()
  parent_id: string;

  /**
   * Title of the page
   */
  @IsString()
  title: string;
}
