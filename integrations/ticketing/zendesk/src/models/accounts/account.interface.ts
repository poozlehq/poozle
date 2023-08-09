/** Copyright (c) 2023, Poozle, all rights reserved. **/

// import { Collection } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface AccountWithRaw {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;

  id: string;
  name: string;
  domains: string[];
  created_at: string;
  updated_at: string;
}

export interface AccountsResponse {
  data: AccountWithRaw[];
  meta: Meta;
}

export interface AccountResponse {
  data: AccountWithRaw;
}

export interface GetAccountsParams {
  queryParams: {
    limit: number;
    cursor?: string;
    created_after?: string;
  };
  pathParams: {};
}

export interface GetAccountParams {
  queryParams: {};
  pathParams: {
    account_id: string;
    team_id: string;
  };
}

export interface CreateAccountParams {
  queryParams: {};

  pathParams: {};

  requestBody: {
    name: string;
  };
}

export interface updateAccountParams {
  queryParams: {};

  pathParams: {
    account_id: string;
  };

  requestBody: {
    name: string;
  };
}
