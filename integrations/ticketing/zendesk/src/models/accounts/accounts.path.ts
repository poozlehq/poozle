/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { getBaseUrl, getPageMeta } from 'common';

import { AccountsResponse, CreateAccountParams, GetAccountsParams } from './account.interface';
import { convertAccount } from './account.utils';

export class AccountsPath extends BasePath {
  async fetchAccounts(
    url: string,
    headers: AxiosHeaders,
    params: GetAccountsParams,
  ): Promise<AccountsResponse> {
    const page = params.queryParams.cursor ? parseInt(params.queryParams.cursor.toString()) : 1;

    const final_params = {
      per_page: params.queryParams.limit ?? 10,
      page,
    };

    const response = await axios({
      url,
      headers,
      params: final_params,
    });

    return {
      data: response.data.organizations.map((organization: any) => convertAccount(organization)),
      meta: getPageMeta(response.data, page.toString()),
    };
  }

  async createAccounts(url: string, headers: AxiosHeaders, params: CreateAccountParams) {
    const response = await axios.post(url, { organisation: params.requestBody }, { headers });

    return convertAccount(response.data);
  }
  async run(
    method: string,
    headers: AxiosHeaders,
    params: GetAccountsParams | CreateAccountParams,
    config: Config,
  ) {
    const BASE_URL = getBaseUrl(config);
    const url = `${BASE_URL}/organizations`;
    switch (method) {
      case 'GET':
        return this.fetchAccounts(url, headers, params as GetAccountsParams);

      case 'POST':
        return this.createAccounts(url, headers, params as CreateAccountParams);

      default:
        throw new Error('Method not found');
    }
  }
}
