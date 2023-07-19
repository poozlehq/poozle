/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Thread } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface ThreadsResponse {
  data: Thread[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
}

export interface ThreadResponse {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Thread | {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
  error?: string;
}

export interface ThreadResponse {
  id: string;
  snippet: string;
  historyId: string;
}
