/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UserWithRaw } from './user.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): UserWithRaw {
  return {
    id: data.login,
    name: data.login,
    avatar: data.avatar_url,

    // Extra field
    email_address: '',

    // Raw
    raw: data,
  };
}
