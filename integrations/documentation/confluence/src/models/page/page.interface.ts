/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Page } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface PageWithRaw extends Page {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface PagesResponse {
  data: PageWithRaw[];
  meta: Meta;
}

export interface PageResponse {
  data: PageWithRaw;
}

export interface PagesParams {
  queryParams: {
    limit: number;
    title?: string;
    direction?: string;
    sort?: string;
    cursor?: string;
  };

  pathParams: {
    parent_id: string;
  };
}

export interface PageParams {
  querParams: {};
  pathParams: {
    page_id: string;
  };
}

export interface CreatePageParams {
  pathParams: {
    parent_id: string;
  };

  requestBody: {
    data: Page[];
  };
}

export interface UpdatePageParams {
  pathParams: {
    block_id: string;
  };

  requestBody: Page;
}
