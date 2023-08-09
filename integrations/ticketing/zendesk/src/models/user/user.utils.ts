/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UserWithRaw } from './user.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): UserWithRaw {
  return {
    id: data.id,
    name: data.name,
    avatar: data.avatar_url,
    email_address: data.email,
    is_active: data.active,
    created_at: data.created_at,
    updated_at: data.updated_at,
    raw: data,
  };
}
