/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tag } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface TagsResponse {
  data: Tag[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface TagResponse {
  data: Tag;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}
