/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl } from 'common';

import { AccountResponse, GetAccountParams, updateAccountParams } from './account.interface';
import { convertAccount } from './account.utils';

export class AccountPath extends BasePath {
  async fetchSingleAccount(
    url: string,
    headers: AxiosHeaders,
    _params: GetAccountParams,
  ): Promise<AccountResponse> {
    const response = await axios({
      url,
      headers,
    });

    return {
      data: convertAccount(response.data.group),
    };
  }

  async updateAccount(
    url: string,
    headers: AxiosHeaders,
    params: updateAccountParams,
  ): Promise<AccountResponse> {
    const response = await axios.put(url, { group: params.requestBody }, { headers });

    return { data: convertAccount(response.data.group) };
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetAccountParams | updateAccountParams,
    config: Config,
  ) {
    const BASE_URL = getBaseUrl(config);
    const url = `${BASE_URL}/organizations/${params.pathParams.account_id}`;

    switch (method) {
      case 'GET':
        return this.fetchSingleAccount(url, headers, params as GetAccountParams);

      case 'POST':
        return this.updateAccount(url, headers, params as updateAccountParams);

      default:
        throw new Error('Method not found');
    }
  }
}
