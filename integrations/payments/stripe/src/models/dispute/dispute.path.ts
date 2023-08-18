/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, RateLimitError } from 'common';

import { GetDisputeParams, DisputeResponse } from './dispute.interface';
import { convertDispute } from './dispute.utils';

export class DisputePath extends BasePath {
  async fetchSingleDispute(
    url: string,
    headers: AxiosHeaders,
    _params: GetDisputeParams,
  ): Promise<DisputeResponse> {
    const response = await axios({
      url,
      headers,
    });
    if (response.status === 429) {
      throw new RateLimitError();
    }

    return { data: convertDispute(response.data) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetDisputeParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _config: Config,
  ) {
    let url = `${BASE_URL}/disputes/${params.pathParams.dispute_id}`;
    switch (method) {
      case 'GET':
        return this.fetchSingleDispute(url, headers, params);

      default:
        throw new Error('Method not found');
    }
  }
}
