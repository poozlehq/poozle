/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { PaginationParams } from './pagination.interface';
import { QueryParams } from './query.interface';

export const defaultPaginationParams: PaginationParams = {
  limit: 10,
};

export const defaultQueryParams: QueryParams = {
  limit: 10,
  raw: false,
};
