/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UserWithRaw } from './user.interface';

export function convertUser(data: any): UserWithRaw {
  return {
    id: data.accountId,
    name: data.displayName,
    avatar: data.avatarUrls['48x48'],

    // Extra field
    email_address: '',

    // Raw
    raw: data,
  };
}
