/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Collection } from '@poozle/engine-idk';

export interface FetchCollectionsParams {
  queryParams: {
    limit: number;
    cursor?: string;
  };
}

export interface CollectionWithRaw extends Collection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
