/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AccountWithRaw } from './account.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertAccount(data: any): AccountWithRaw {
  return {
    id: data.name,
    name: data.name,
    domains: data.domain_names,
    created_at: data.created_at,
    updated_at: data.updated_at,
    raw: data,
  };
}
