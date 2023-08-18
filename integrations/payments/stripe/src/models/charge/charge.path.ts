/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, RateLimitError } from 'common';

import { ChargeResponse, GetChargeParams } from './charge.interface';
import { convertCharge } from './charge.utils';

export class ChargePath extends BasePath {
  async fetchSingleCharge(url: string, headers: AxiosHeaders): Promise<ChargeResponse> {
    const response = await axios({
      url,
      headers,
    });
    if (response.status === 429) {
      throw new RateLimitError();
    }

    return { data: convertCharge(response.data) };
  }

  async run(_method: string, headers: AxiosHeaders, params: GetChargeParams, _config: Config) {
    const url = `${BASE_URL}/charges/${params.pathParams?.charge_id}`;
    return this.fetchSingleCharge(url, headers);
  }
}
