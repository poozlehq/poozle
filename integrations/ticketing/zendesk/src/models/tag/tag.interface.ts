/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tag } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TagWithRaw extends Tag {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface TagsResponse {
  data: TagWithRaw[];
  meta: Meta;
}

export interface TagResponse {
  data: TagWithRaw;
}

export interface GetTeamsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    created_after?: string;
  };
  pathParams: {};
}
