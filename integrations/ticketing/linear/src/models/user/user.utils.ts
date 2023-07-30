/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { LinearUser } from './user.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): LinearUser {
  return {
    id: data.id,
    name: data.name,
    avatar: data.avatarUrl,
    email_address: data.email,
    url: data.url,
    created_at: data.created_at,
  };
}