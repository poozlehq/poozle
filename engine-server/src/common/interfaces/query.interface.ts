/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { PaginationParams } from './pagination.interface';

export interface QueryParams extends PaginationParams {
  sort: {
    by: string;
  };

  raw: boolean;

  filter: Record<string, string>;
}
