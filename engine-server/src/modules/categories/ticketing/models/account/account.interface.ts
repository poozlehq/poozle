/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class AccountQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class GetAccountQueryParams extends JustRawParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class Account {
  id: string;
  name: string;
  domains: string[];
  created_at: string;
  updated_at: string;

  integration_account_id?: string;
}

export const ACCOUNT_KEYS = [
  'id',
  'domains',
  'name',
  'description',
  'updated_at',
  'created_at',
];

export class TicketingAccountsResponse {
  data: Account[];
  meta: Meta;
}

export class TicketingAccountResponse {
  data: Account;
}

export class PathParamsWithAccountId {
  @IsString()
  account_id: string;
}
