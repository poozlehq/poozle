/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, convertToEpoch, getMetaParams, RateLimitError } from 'common';

import { ChargesResponse, GetChargesParams } from './charge.interface';
import { convertCharge } from './charge.utils';

export class ChargesPath extends BasePath {
  async fetchCharges(
    url: string,
    headers: AxiosHeaders,
    params: GetChargesParams,
  ): Promise<ChargesResponse> {
    const created_after = convertToEpoch(params.queryParams.created_after);

    const final_params = {
      limit: params.queryParams?.limit,
      ...(params.queryParams.cursor ? { starting_after: params.queryParams.cursor } : {}),
      ...(params.queryParams.created_after ? { 'created[gt]': created_after } : {}),
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    if (response.status === 429) {
      throw new RateLimitError();
    }
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: response.data.data.map((data: any) => convertCharge(data)),
      meta: getMetaParams(response.data, params.queryParams.cursor),
    };
  }

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: GetChargesParams,
    _config: Config,
  ): Promise<ChargesResponse> {
    const url = `${BASE_URL}/charges`;
    return this.fetchCharges(url, headers, params);
  }
}
