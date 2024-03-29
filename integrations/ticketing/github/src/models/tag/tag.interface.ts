/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CreateTagBody, Tag, UpdateTagBody } from '@poozle/engine-idk';
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

export interface GetTagsParams {
  queryParams: {
    limit: number;
    cursor: string;
  };

  pathParams: {
    collection_id: string;
  };
}

export interface GetTagParams {
  pathParams: {
    collection_id: string;
  };
}

export interface CreateTagParams {
  requestBody: CreateTagBody;

  pathParams: {
    collection_id: string;
  };
}

export interface UpdateTagParams {
  requestBody: UpdateTagBody;

  pathParams: {
    collection_id: string;
  };
}
