/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Charge } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface ChargeWithRaw extends Charge {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface ChargesResponse {
  data: ChargeWithRaw[];
  meta?: Meta;
  error?: any;
}

export interface ChargeResponse {
  data: ChargeWithRaw;
}

export interface GetChargesParams {
  queryParams: {
    limit: number;
    created_after: string;
    cursor: string;

    sort?: string;
    direction?: string;
  };
}

export interface GetChargeParams {
  pathParams: {
    charge_id: string;
  };
}
