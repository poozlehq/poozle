/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UserWithRaw } from './user.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): UserWithRaw {
  return {
    id: data.id,
    name: data.name,
    avatar: data.url,

    // Extra field
    email_address: data.email,

    // Raw
    raw: data,
  };
}
