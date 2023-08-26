/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Collection } from '@poozle/engine-idk';

import { Meta } from '../../common';

export interface CollectionWithRaw extends Collection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface CollectionResponse {
  data: CollectionWithRaw;
}

export interface CollectionsResponse {
  data: CollectionWithRaw[];
  meta: Meta;
}

export interface GetCollectionsParams {
  queryParams: {
    limit: number;
    cursor: string;

    sort?: string;
    direction?: string;
  };
}

export interface GetCollectionParams {
  pathParams: {
    collection_id: string;
  };
}
