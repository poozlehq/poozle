/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Collection } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface CollectionsResponse {
  data: Collection[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface CollectionResponse {
  data: Collection;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
