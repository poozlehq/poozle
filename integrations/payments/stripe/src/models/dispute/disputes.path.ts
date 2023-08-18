/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, convertToEpoch, getMetaParams, RateLimitError } from 'common';

import { GetDisputesParams, DisputesResponse } from './dispute.interface';
import { convertDispute } from './dispute.utils';

export class DisputesPath extends BasePath {
  async getDisputes(
    url: string,
    headers: AxiosHeaders,
    params: GetDisputesParams,
  ): Promise<DisputesResponse> {
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
      data: response.data.data.map((data: any) => convertDispute(data)),
      meta: getMetaParams(response.data, params.queryParams.cursor),
    };
  }

  async run(method: string, headers: AxiosHeaders, params: GetDisputesParams, _config: Config) {
    let url = `${BASE_URL}/disputes`;
    switch (method) {
      case 'GET':
        return this.getDisputes(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
