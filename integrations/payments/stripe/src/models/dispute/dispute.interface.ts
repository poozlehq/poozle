/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Dispute } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface DisputeWithRaw extends Dispute {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface DisputesResponse {
  data: DisputeWithRaw[];
  meta: Meta;
}

export interface DisputeResponse {
  data: DisputeWithRaw;
}

export interface GetDisputesParams {
  queryParams: {
    limit: number;
    cursor: string;
    created_after: string;
  };

  pathParams: {
    collection_id: string;
  };
}

export interface GetDisputeParams {
  pathParams: {
    dispute_id: string;
  };
}
